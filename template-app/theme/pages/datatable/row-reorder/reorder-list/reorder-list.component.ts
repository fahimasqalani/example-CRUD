import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { ServicesService } from '@services/services.service';


@Component({
    selector: ".m-wrapper",
    templateUrl: "./reorder-list.component.html",
    styleUrls: ['./reorder-list.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class ReorderListComponent implements OnInit {

    dataTable;
    data;
    customConfig: {};
    isReload = false;

    selectedForSwap;
    swapMode = true;

    constructor(
        private _services: ServicesService) { }

    ngOnInit() {
        this.initTable();
    }

    ngAfterViewInit() {
        let that = this;
        $('#datatable').on('click', 'tbody tr', function (e) {
            if (that.swapMode) {
                if (!e.currentTarget.classList.contains('selected')) {
                    let rowData = that.dataTable.row(this).data();
                    if (that.selectedForSwap) {
                        // to call api
                        // let swapData = {
                        //     mainCatA: that.selectedForSwap.mainCategoryName,
                        //     mainCatAOrderBy: that.selectedForSwap.orderByMainCategory,
                        //     mainCatB: rowData.mainCategoryName,
                        //     mainCatBOrderBy: rowData.orderByMainCategory
                        // }
                        // that._services.http('put', that._services.swapMainCategory(), swapData, true, true).subscribe(result => {
                        //     that.dataTableReload();
                        //     that.selectedForSwap = null;
                        // }, (err) => {
                        //     that.selectedForSwap = null;
                        //     that.swapMode = false;
                        //     that.dataTableReload();
                        // })
                    } else {
                        that.selectedForSwap = rowData;
                    }
                } else {
                    that.selectedForSwap = null;
                }
                $(this).toggleClass('selected');
            }
        });
    }

    initTable() {
        let that = this;
        this.customConfig = {
            ajax: {
                url: this._services.getDatatableData(),
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
        // this.dataTable.destroy();
        // this.initTable();

        // Note: .draw() will trigger datatable to call api to update the status, current state will remain 
        // use destroy and reinit if when to update the whole datatable
    }

}