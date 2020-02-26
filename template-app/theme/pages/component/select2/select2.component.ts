import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { ServicesService } from '@services/services.service';


@Component({
    selector: ".m-wrapper",
    templateUrl: "./select2.component.html",
    encapsulation: ViewEncapsulation.None
})

export class SelectTwoComponent implements OnInit {

    outletList = [
        'Outlet A', 'Outlet B'
    ];
    isAllOutlets = false;
    body = { outlets: [] };
    userDetails = {
        outletNames: []
    };

    constructor(
        private _services: ServicesService) { }

    ngOnInit() {

    }

    ngAfterViewInit() {
        this.initOutletSelection();
    }

    toggleOutlets() {
        if(this.isAllOutlets) {
            ($('#m_outlets_select') as any).val(this.outletList).trigger('change');
        } else {
            ($('#m_outlets_select') as any).val('').trigger('change');
        }
    }

    initOutletSelection() {
        ($('#m_outlets_select') as any).select2({
            width: '100%',
            multiple: true,
            data: this.outletList
        })

        if(this.userDetails.outletNames.length) {
            ($('#m_outlets_select') as any).val(this.userDetails.outletNames);
            ($('#m_outlets_select') as any).trigger('change');
        }

        $('#m_outlets_select').on('change.select2', (e) => {
            this.body.outlets = ($('#m_outlets_select') as any).val();
            if(this.body.outlets.length !== this.outletList.length) {
                this.isAllOutlets = false;
            }
        });
    }

}