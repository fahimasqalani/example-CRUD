import { Injectable } from "@angular/core";
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { forkJoin, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';
import * as _ from "lodash";
import * as CryptoJS from 'crypto-js';
import { SECRET, ENCRYPTION } from '@shared/constants';
import swal from 'sweetalert2';
declare var $: any;
declare let mApp: any;

import { NgFlexHttpService } from '@flexsolver/ng-flex-http';
import { TranslateService } from '@ngx-translate/core';
import { environment } from "environments/environment";

@Injectable()
export class AppService {

    public SERVER_ADDRESS = environment.serverEndPoint;
    private SECRET = SECRET;
    public ENCRYPTION = ENCRYPTION;
    public language;

    constructor(
        public flexHttp: NgFlexHttpService,
        public translate: TranslateService,
        public router: Router,
        private cookie: CookieService) {
            this.initFlexHttp();
            this.getDatatableLanguage();
    }
    preventMultiErr = false;

    setToken(token) {
        if (token) {
            this.cookie.set('token', token);
        }
    }

    getToken() {
        let token = this.cookie.get('token');
        return token;
    }

    initFlexHttp() {
        let token = this.getToken();
        if (token) {
            let header = { authorization: token };
            this.flexHttp.init({
                rootURL: this.SERVER_ADDRESS,
                globalHeaders: header,
                autoParseFlexData: false,
                errorInterceptor: async (error: any) => {
                    this.hideLoader();
                    if (error.error instanceof Blob) {
                        // to handle error throw by excel API
                        // read blob return response
                        await this.readBlobAndConvertBack(error)
                    } 
                    this.errorHandler(error);
                }
            });
        } else {
            this.flexHttp.init({
                rootURL: this.SERVER_ADDRESS,
                autoParseFlexData: false
            });
        }
    }

    readBlobAndConvertBack(error) {
        return new Promise((resolve, reject) => {
            let reader: any = new FileReader();
            reader.addEventListener(`loadend`, () => {
                error.error = JSON.parse(reader.result);
                resolve(error.error);
            });
            reader.readAsText(error.error);
        })
    }

    errorHandler(error) {
        let errorTitle = `Server Error`;
        let defaultMessage = `Connection issue. Please contact Flex-Solver`
        if (!this.preventMultiErr) {
            if (error.status === 0) {
                this.showNotification('Server Error', defaultMessage, 'danger', { timer: 3000 });
            } else if (error.status === 401) {
                this.logout(true);
            } else if (error.status === 413) {
                this.showNotification(errorTitle, `${error.statusText || defaultMessage}`, 'danger', { timer: 3000 });
            } else {
                try {
                    this.showNotification(errorTitle, `${error.error.message || defaultMessage}`, 'danger', { timer: 3000 });
                } catch (e) {
                    this.showNotification(errorTitle, `${error.statusText || defaultMessage}`, 'danger', { timer: 3000 });
                }
            }
            this.preventMultiErr = true;
        }
        return error;
    }

    getDatatableLanguage() {
        let lang = localStorage.getItem('language')
        this.language = `./assets/i18n/datatable/datatable-${lang}.json`;
    }

    getCurrentUser() {
        let user = localStorage.getItem('user');
        return this.decryption(user);
    }

    validateAccessbility(first, second) {
        let currentUser = this.getCurrentUser();
        let valid = false;
        
        if (currentUser && currentUser.accessibility && currentUser.accessibility.length) {
            for (let x of currentUser.accessibility) {
                if (x.path.includes(first)) {
                    if(x.subpage.length) {
                        for (let y of x.subpage) {
                            if (y.path.includes(second) && y.enabled) {
                                valid = true;
                                break;
                            }
                        }
                    } else if (x.enabled) {
                        valid = true;
                    }
                }
                if (valid) {
                    break;
                }
            }
            return valid;
        } else {
            return true;
        }
    }

    dataTableGlobalConfig(config, dom, object = {}) {
        this.getDatatableLanguage();
        
        this.showLoader();
        let that = this;
        const defaultConfig = {
            serverSide: true,
            stateSave: true,
            ajax: {
                type: 'POST',
                headers: {
                    Authorization: this.getToken()
                },
                data: function(d, params) {
                    if (!params.ajax.url.includes('http://') && !params.ajax.url.includes('https://')) {
                        params.ajax.url = that.SERVER_ADDRESS + params.ajax.url;
                    }
                    d = _.merge(d, object)
                    if (that.ENCRYPTION) {
                        let encypted = {
                            data: that.encryption(d)
                        }
                        return encypted;
                    } else {
                        return d;
                    }
                },
                dataSrc: function(response) {
                    let x;
                    if (that.ENCRYPTION) {
                        x = that.decryption(response.data);
                    } else {
                        x = response.data;
                    }
                    if (config['custom']) {
                        return x.table;
                    } else if (config['paging'] == false) {
                        response.draw = parseInt(x.length);
                        response.recordsTotal = parseInt(x.length);
                        response.recordsFiltered = parseInt(x.length);
                        return x;
                    } else {
                        response.draw = parseInt(x.draw);
                        response.recordsTotal = parseInt(x.recordsTotal);
                        response.recordsFiltered = parseInt(x.recordsFiltered);
                        return x.data;
                    }
                },
                error: function(xhr) {
                    let x: any = document.getElementById('datatable_info');
                    if (x) {
                        x.innerHTML = `<span class="m--font-danger">${that.translate.instant('Server Error. Please contact Flex-Solver')}</span>`;
                    }
                    that.hideLoader();
                    that.ajaxDetectError(xhr);
                }
            },
            initComplete: function(settings, json) {
                $($(dom)).DataTable().state.clear();
                $($(dom + '_filter input')).unbind();
                $($(dom + '_filter input')).bind('keyup', function(e) {
                    let tempSearch: any = $($(dom + '_filter input'))[0];
                    if (e.keyCode === 13) {
                        that.showLoader();
                        let datatable = ($(`${dom}`) as any).DataTable();
                        datatable.search(tempSearch.value).draw();
                    }
                });
            },
            drawCallback: function (settings) {
                that.hideLoader();
            },
            dom: "<'row'<'col-sm-6'f>><'row'<'col-sm-12'tr>>\n\t\t\t<'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7 dataTables_pager'lp>>",
            paging: true,
            search: {
                "regex": true
            },
            pagingType: "full_numbers",
            lengthMenu: [
                [20, 50, 100, 300, -1], [20, 50, 100, 300, "All"]
            ],
            pageLength: 20,
            language: {
                url: this.language,
                lengthMenu: `Display _MENU_`,
                search: "_INPUT_",
                searchPlaceholder: this.translate.instant("Search...")
            }
        }
        let merge = _.merge(defaultConfig, config);
        if(merge.paging) {
            this.setDatatableLoader(dom);
        } else {
            this.hideLoader();
        }
        return merge;
    }

    setDatatableLoader(dom) {
        let that = this;
        ($(`${dom}`) as any).on('draw.dt', function() {
            that.hideLoader();
        });
        ($(`${dom}`) as any).on('page.dt length.dt', function() {
            that.showLoader()
        });
        ($(`${dom}`) as any).on('click', 'thead th', function(e) {
            if (!e.target.classList.contains('sorting_disabled')) {
                that.showLoader();
            }
        });
    }

    showLoader() {
        mApp.blockPage({
            overlayColor: "#000000", type: "loader", state: "primary", 
            message: this.translate.instant("Please wait...")
        })
    }

    hideLoader() {
        setTimeout(() => {
            mApp.unblockPage();
        }, 200)
    }

    ajaxDetectError(xhr) {
        this.hideLoader();
        let title = this.translate.instant('Server Error'), 
            msg = this.translate.instant('Connection issue. Please contact Flex-Solver');;

        if(xhr.status === 0) {
            this.showNotification(title, msg, 'danger', { timer: 3000 });
        } else {
            let response = xhr.responseJSON;
            try {
                if (response.status === 401) {
                    this.logout(true);
                } else {
                    msg = this.translate.instant(`${response.message}`);
                    this.showNotification(title, msg, 'danger', { timer: 3000 });
                }
            } catch (e) {
                this.showNotification(title, msg, 'danger', { timer: 3000 });
            }
        }
    }

    logout(showMsg?) {
        this.hideLoader();
        localStorage.removeItem('user');
        this.cookie.delete('token');
        if (showMsg === true) {
            this.showNotification('Session Expired', 'Please log in again', 'danger', { timer: 3000 });
        }
        this.router.navigate(['/login'], { queryParams: { returnUrl: this.router.url } });

        this.initFlexHttp();
        // reset flexhttp
        // to reset error interceptor
        $('.modal-backdrop').remove();
    }

    markFormGroupTouched(formGroup) {
        if (formGroup.controls) {
            const keys = Object.keys(formGroup.controls);
            for (let i = 0; i < keys.length; i++) {
                const control = formGroup.controls[keys[i]];

                if (control instanceof FormControl) {
                    control.markAsTouched();
                } else if (control instanceof FormGroup) {
                    this.markFormGroupTouched(control);
                } else if (control instanceof FormArray) {
                    this.markFormGroupTouched(control);
                }
            }
        }
    }

    showNotification(title: string, message: string, type: string, config?) {
        title = title ? this.translate.instant(title) : '';
        message = message ? this.translate.instant(message) : '';
        let content = { title, message };
        let position = { from: 'top', align: 'right' };
        if (config) {
            position = config
        }
        $.notify(content, {
            type: type,
            allow_dismiss: true,
            newest_on_top: true,
            mouse_over: true,
            showProgressbar: false,
            spacing: 10,
            timer: 2000,
            placement: position,
            offset: {
                x: 30,
                y: 30
            },
            delay: 1000,
            z_index: 10000,
            animate: {
                enter: 'animated fadeInDown',
                exit: 'animated fadeOutUp'
            }
        });
        setTimeout(() => {
            this.preventMultiErr = false;
        }, 1000)
    }

    swalNotification(type, title, text, cancel) {
        return swal({
            type: type,
            title: this.translate.instant(`${title}`),
            text: this.translate.instant(`${text}`),
            allowOutsideClick: false,
            showCancelButton: cancel,
            confirmButtonColor: '#5867dd',
            confirmButtonText: this.translate.instant('OK'),
            cancelButtonText: this.translate.instant('Cancel')
        })
    }

    parseHttpResponse(response) {
        try {
            return response['data'];
        } catch (e) {
            return response;
        }
    }

    getFileNameFromHttpResponse(httpResponse) {
        let contentDispositionHeader = httpResponse.headers.get('Content-Disposition');
        let result = contentDispositionHeader.split(';')[1].trim().split('=')[1];
        return decodeURIComponent(result.replace(/"/g, ''));
    }

    downloadExcelFile(response, msg) {
        const blob = new Blob([response.body], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        const url = window.URL.createObjectURL(blob);
        let link = document.createElement('a');
        // Add the element to the DOM
        link.setAttribute("type", "hidden"); // make it hidden if needed
        link.download = this.getFileNameFromHttpResponse(response);
        link.href = url
        document.body.appendChild(link);
        link.click();
        link.remove();
        this.showNotification(this.translate.instant('Success'), this.translate.instant(`${msg}`), 'success');
    }

    encryption(response, type?) {
        try {
            type === true ? response = response.toString() : response = JSON.stringify(response);
            let encryptData = CryptoJS.AES.encrypt(response, this.SECRET).toString();
            return encryptData;
        } catch {
            this.endercyrptionError();
        }
    }

    decryption(response, type?) {
        try {
            let bytes = CryptoJS.AES.decrypt(response, this.SECRET);
            let decryptedData = bytes.toString(CryptoJS.enc.Utf8);
            type === true ? decryptedData = decryptedData : decryptedData = JSON.parse(decryptedData);
            return decryptedData;
        } catch {
            this.endercyrptionError();
        }
    }

    endercyrptionError() {
        this.hideLoader()
        localStorage.removeItem('user');
        localStorage.removeItem('SERVER_ADDRESS');
        this.cookie.delete('token');
        this.router.navigate(['/login']);
        this.initFlexHttp();
    }

    prepend(value, array) {
        let newArray = array.slice();
        newArray.unshift(value);
        return newArray;
    }

    toTitleCase(str) {
        return str.replace(
            /\w\S*/g,
            function(txt) {
                return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
            }
        );
    }

    b64toBlob(b64Data, contentType, sliceSize) {
        contentType = contentType || '';
        sliceSize = sliceSize || 512;
        let byteCharacters = atob(b64Data);
        let byteArrays = [];
        for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
            let slice = byteCharacters.slice(offset, offset + sliceSize);
            let byteNumbers = new Array(slice.length);
            for (let i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
            }
            let byteArray = new Uint8Array(byteNumbers);
            byteArrays.push(byteArray);
        }
        let blob = new Blob(byteArrays, {type: contentType});
        return blob;
    }

    forkHttp(list = [], isLoading: boolean = false, type: string = 'get'): Observable<any[]> {
        if (list && list.length) {
            if (isLoading) {
                this.showLoader();
            }
            let apiCalls = [];
            for (let l of list) {
                if (typeof l === 'object') {
                    apiCalls.push(this.http(l.type, l.api, l.value));
                } else {
                    apiCalls.push(this.http(type, l, {}));
                }
            }
            return forkJoin(
                apiCalls
            ).pipe(map(response => {
                if (isLoading) {
                    this.hideLoader();
                }
                return response; 
            }));
        }
        return;
    }

    http(httpType: string, url: string, data: any = {}, isMessage: boolean = false, isLoading: boolean = false, isFormData: boolean = false, isBlob: boolean = false) {
        let body;
        if (isLoading) {
            this.showLoader();
        }
        if(isFormData) {
            body = data
        } else {
            this.ENCRYPTION ?  body = { data: this.encryption(data) } : body = data;
        }
        return this.flexHttp[`${httpType}`]({
            url: url,
            responseType: isBlob ? 'blob' : 'json',
            observe: isBlob ? 'response' : 'body',
            body: body,
            successMap: (response) => {
                if (isLoading) {
                    this.hideLoader();
                }
                if (isMessage) {
                    this.showNotification('Success', response.message, 'success');
                }
                if (this.ENCRYPTION) {
                    response.data = this.decryption(response.data);
                }
                return response;
            }
        })
    }


}