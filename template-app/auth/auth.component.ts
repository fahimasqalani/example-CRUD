import { Component, ComponentFactoryResolver, OnInit, ViewChild, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ScriptLoaderService } from '@services/script-loader.service';
import { AlertService } from './_services/alert.service';
import { ServicesService } from '@services/services.service';
import { AlertComponent } from './_directives/alert.component';

import { TranslateService } from '@ngx-translate/core';

import * as moment from 'moment';

@Component({
    selector: '.m-grid.m-grid--hor.m-grid--root.m-page',
    templateUrl: './auth.component.html',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./auth.component.scss']
})

export class AuthComponent implements OnInit {
    model: any = {};
    loading = false;
    returnUrl: string;
    preLang;
    default: string = 'en';

    resetEmail;
    validEmail = null;

    year = moment().format('YYYY');

    @ViewChild('alertSignin',
        { read: ViewContainerRef, static: false }) alertSignin: ViewContainerRef;
    @ViewChild('alertSignup',
        { read: ViewContainerRef, static: false }) alertSignup: ViewContainerRef;
    @ViewChild('alertForgotPass',
        { read: ViewContainerRef, static: false }) alertForgotPass: ViewContainerRef;

    constructor(
        private _router: Router,
        private _script: ScriptLoaderService,
        private _route: ActivatedRoute,
        private _services: ServicesService,
        private _alertService: AlertService,
        private cfr: ComponentFactoryResolver,
        private translate: TranslateService) {
            this.model.username = 'admin';
            this.model.password = 'password';
    }

    ngOnInit() {
        this.model.remember = true;
        // get return url from route parameters or default to '/'
        this.returnUrl = this._route.snapshot.queryParams['returnUrl'] || '/';
        this._router.navigate([this.returnUrl]);

        this.getLanguage();
    }

    signin() {
        this.loading = true;
        let data = {
            account: this.model.username,
            password: this.model.password
        }

        this._services.setToken('1');
        localStorage.setItem('user', this._services.encryption('1'));
        this._services.initFlexHttp();
        this._router.navigate([this.returnUrl]);

        // this._services.http(`post`, this._services.login(), data, false, false, false, false).subscribe((response: any) => {
        //     let token = response.data.token;
        //     let user = response.data;
        //     delete user.token;
        //     if (token) {
        //         localStorage.setItem('user', this._services.encryption(user));
        //         this._services.initFlexHttp();
        //     }
        //     this._router.navigate([this.returnUrl]);
        // }, (error) => {
        //     this.showAlert('alertSignin');
        //     this._alertService.error(error.error.message);
        //     this.loading = false;
        // });
    }

    showAlert(target) {
        this[target].clear();
        let factory = this.cfr.resolveComponentFactory(AlertComponent);
        let ref = this[target].createComponent(factory);
        ref.changeDetectorRef.detectChanges();
    }

    getLanguage() {
        this.preLang = localStorage.getItem('language');

        if (this.preLang) {
            this.translate.use(this.preLang);
        }
        else {
            localStorage.setItem('language', this.default);
            this.translate.use(this.default);
        }
    }

    changeLanguage() {
        let a: any = document.getElementById('language');
        localStorage.setItem('language', a.value);
        this.translate.use(a.value);
    }

    setLanguage() {
        let lang = localStorage.getItem('language');
        this.translate.use(lang);
    }

    resetModal() {
        $(document.body).removeClass('modal-open');
        $('.modal-backdrop').remove();
        $('#forget_modal').hide();
        this.validEmail = null;
        this.resetEmail = '';
    }

    validateEmail() {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        re.test(String(this.resetEmail).toLowerCase()) ? this.validEmail = true : this.validEmail = false
    }

    forgetPassword() {
        // this.validateEmail()
        // if (!this.validEmail) {
        //     return false;
        // }
        // this._authService.forgetPassword(this.resetEmail)
        //     .subscribe((response) => {
        //         swal({
        //             type: 'success',
        //             title: this._authService.translate.instant('Please check your email'),
        //             html: `<span>${this._authService.translate.instant('We have e-mailed password reset link to')}</span><br/>
        //                 ${this.resetEmail}`,
        //             allowOutsideClick: false,
        //             confirmButtonColor: '#716aca',
        //             confirmButtonText: this._authService.translate.instant("OK"),
        //         }).then((result) => {
        //             if (result.value) {
        //                 this.resetModal();
        //             }
        //         })
        //     }, (err) => {

        //     })
    }

}