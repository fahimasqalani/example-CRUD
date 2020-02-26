import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import * as moment from 'moment';

import { ServicesService } from '@services/services.service';


@Component({
    selector: ".m-wrapper",
    templateUrl: "./date-picker.component.html",
    encapsulation: ViewEncapsulation.None
})

export class DatePickerComponent implements OnInit {

    selectedDate;
    defaultDate = moment();

    constructor(
        private _services: ServicesService) { }

    ngOnInit() {

    }

    ngAfterViewInit() {
        
    }

    outputDate(e) {
        console.log(e)
    }

    setDate() {
        this.defaultDate = moment('2010-01-01');
    }

}