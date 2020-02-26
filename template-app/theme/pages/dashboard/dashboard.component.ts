import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import * as moment from 'moment';

import { ServicesService } from '@services/services.service';

@Component({
    selector: "app-dashboard",
    templateUrl: "./dashboard.component.html",
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./dashboard.component.scss'],
    host: {
        '(window:resize)': 'onResize($event)'
    }
})

export class DashboardComponent implements OnInit {

    date = moment();

    constructor(
        private _services: ServicesService) { }


    ngOnInit() {
        
    }

    onResize(e) {

    }

    exampleHttp() {
        /*
            1. http type (get, post, put, delete)
            2. API path (use services.service.ts to store and return the api path)
            3. payload body, if is get then {} will do
            4. show message toast upon 200 status
            5. show global loading
            6. form data, e.g. when need to pass image then need to send as form data
            7. is blob, if is getting excel file, then set to true
        */
        this._services.http(`get`, 'api path', {}, true, true, false, false).subscribe((response: any) => {
            console.log(response.data); // response.data is what you need
        })
    }

    ngAfterViewInit() {
        
    }

    get() {
        this._services.http(`get`, this._services.getExample()).subscribe((response: any) => {
            console.log(response.data);
        })
    }

    generateExcel() {
        // this._services.showLoader();
        // this._services.http('post', this._services.excelAPIPath(), this.body, false, false, false, true).subscribe((response: any) => {
        //     this._services.downloadExcelFile(response, 'Excel exported');
        // })
    }

}