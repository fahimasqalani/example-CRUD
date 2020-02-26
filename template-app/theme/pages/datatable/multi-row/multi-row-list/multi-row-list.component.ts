import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import * as _ from "lodash";

import { ServicesService } from '@services/services.service';


@Component({
    selector: ".m-wrapper",
    templateUrl: "./multi-row-list.component.html",
    styleUrls: ['./multi-row-list.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class MultiRowListComponent implements OnInit {

    dataTable;
    data;
    customConfig: {};
    isReload = false;

    selectedArr = [];

    constructor(
        private _services: ServicesService) { }

    ngOnInit() {
        this.initTable();
    }

    ngAfterViewInit() {
        let that = this;
        $('#datatable tbody').on('click', 'tr', function(e) {
            let rowData = that.dataTable.row(this).data();
            let deselectBtn = document.getElementsByClassName('delect-btn')[0];
            let deselectText = document.getElementById('deselect');

            if (!e.currentTarget.classList.contains('selected')) {
                that.selectedArr.push(rowData);
            } else {
                for (let a = 0; a < that.selectedArr.length; a++) {
                    if (rowData.id === that.selectedArr[a].id) {
                        that.selectedArr.splice(a, 1);
                    }
                }
            }
            $(this).toggleClass('selected');
            deselectText.innerHTML = that._services.translate.instant("Unselect All - ");
            if (that.selectedArr.length === 0) {
                deselectBtn.classList.add('hide');
                deselectText.innerHTML = that._services.translate.instant("Unselect All");
            } else {
                deselectBtn.classList.remove('hide');
                deselectText.innerHTML += ` ${that.selectedArr.length}`;
            }
            that.selectedArr = _.uniqWith(that.selectedArr, _.isEqual);
        });
    }

    initTable() {
        let that = this;
        this.customConfig = {
            buttons: [
                {
                    text: this._services.translate.instant('Select All'),
                    className: 'btn-primary select-btn hide',
                    action: function() {
                        that.dataTable.rows().select();

                        let rows = that.dataTable.rows('.selected').indexes();
                        let tempArr = that.dataTable.rows(rows).data();

                        for (let a = 0; a < tempArr.length; a++) {
                            that.selectedArr.push(tempArr[a])
                        }

                        that.selectedArr = _.uniqWith(that.selectedArr, _.isEqual);

                        let deselectBtn = document.getElementsByClassName('delect-btn')[0];
                        deselectBtn.classList.remove('hide');

                        let deselectText = document.getElementById('deselect');
                        deselectText.innerHTML = that._services.translate.instant('Unselect All - ');
                        deselectText.innerHTML += ` ${that.selectedArr.length}`;

                    },
                    init: function(api, node, config) {
                        $(node).removeClass('btn-secondary')
                    }
                },
                {
                    text: '<span id="deselect">' + that._services.translate.instant('Unselect All') + '</span>',
                    className: 'm-btn btn-outline-primary delect-btn hide',
                    action: function() {
                        let deselectBtn = document.getElementsByClassName('delect-btn')[0];
                        deselectBtn.classList.add('hide');

                        that.dataTable.rows().deselect();

                        let deselectText = document.getElementById('deselect');
                        deselectText.innerHTML = that._services.translate.instant('Unselect All');

                        that.selectedArr = [];
                    },
                    init: function(api, node, config) {
                        $(node).removeClass('btn-secondary')
                    }
                },
            ],
            dom: "<'row'<'col-xl-5 col-sm-6'f><'col-xl-3 col-sm-2'B>><'row'<'col-sm-12'tr>>\n\t\t\t<'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7 dataTables_pager'lp>>",
            ajax: {
                url: this._services.getDatatableData(),
            },
            rowCallback: function(row, data) {
                for(let x of that.selectedArr) {
                    if(data.idProducts.toString() === x.idProducts.toString()) {
                        $(row).addClass('selected');
                    }
                }
            },
            columns: [
                {
                    title: this._services.translate.instant('ID'),
                    data: 'id',
                    width: 80
                },
                {
                    title: this._services.translate.instant('Name'),
                    width: 200,
                    data: 'name',
                    render: function(data, type, row) {
                        /* 
                            parameters explaination
                            1. data refers to data declared, in this case will be 'name'
                            2. type don't know what is that, ignore, not going to use
                            3. row refer to other attribute of the object, e.g. you can use row.id to get id value
                        */
                        return data ? data : '-';
                    }
                },
                {
                    title: this._services.translate.instant('Status (Sample of Render Column)'),
                    data: 'id',
                    orderable: !1,
                    width: 200,
                    render: function(data, type, row) {
                        return `
                        <a>
                            <span class="m-switch m-switch--outline m-switch--success m--margin-top-10">
                                <label>
                                    <input type="checkbox" ${data ? 'checked' : ''} class="btn-disable" data-id="${row.id}">
                                    <span></span>
                                </label>
                            </span>
                        </a>
                        `;
                    }
                },
                {
                    title: this._services.translate.instant('Actions'),
                    width: 150
                }
            ],
            columnDefs: [
                {
                    className: "dt-center", targets: "_all"
                },
                {
                    targets: -1,
                    orderable: !1,
                    data: 'id',
                    render: function(data, type, row) {
                        const edit = `
                            <a data-id="${data}" data-status="${row.isAvailable}" class="m-portlet__nav-link btn m-btn m-btn--hover-primary m-btn--icon 
                                m-btn--icon-only m-btn--pill btn-edit" title="${that._services.translate.instant('Edit Details')}">
                                <i class="la la-edit"></i>
                            </a>
                        `
                        return edit;
                    }
                }
            ]
        }
        this.dataTable = ($('#datatable') as any).DataTable(this._services.dataTableGlobalConfig(this.customConfig, '#datatable'));
        this.dataTable.on('xhr', (e, settings, json) => {
            this._services.ENCRYPTION ? this.data = this._services.decryption(json.data).data : this.data = json.data.data;
		});
        if (this.isReload === false) {
            this.isReload = true;
            this.initTableEvents();
        }
    }

    initTableEvents() {
        let that = this;
        this.dataTable.on("click", ".btn-disable", function() {
            let id = $(this).data('id');
        })
        this.dataTable.on("click", ".btn-edit", function() {
            let id = $(this).data('id');
            that._services.router.navigate(['management/datatable/form', 'edit'], { queryParams: { 'data': that._services.encryption(id, true) } });
        })
    }

    dataTableReload() {
        this._services.showLoader();
        if (this.dataTable) {
            this.dataTable.draw();
        } else {
            this.initTable();
        }
        
        let deselectText = document.getElementById('deselect');
        deselectText.innerHTML = this._services.translate.instant('Unselect All');
        this.selectedArr= [];
    }

}