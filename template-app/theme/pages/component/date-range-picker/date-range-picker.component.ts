import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import * as moment from 'moment';

import { ServicesService } from '@services/services.service';


@Component({
    selector: ".m-wrapper",
    templateUrl: "./date-range-picker.component.html",
    encapsulation: ViewEncapsulation.None
})

export class DateRangePickerComponent implements OnInit {

    // must have 'startDate' and 'endDate' attributes
    body = {
        startDate: moment().format('YYYY-MM-DD'),
        endDate: moment().format('YYYY-MM-DD')
    }

    constructor(
        private _services: ServicesService) { }

    ngOnInit() {

    }

    datePickerOutput(event) {
        this.body = event;
        console.log(this.body)
    }

    setDate() {
        let newStart = '2010-01-01';
        let newEnd = '2010-01-02';
        
        this.body.startDate = newStart;
        this.body.endDate = newEnd;

        let dom: any = ($(`#date_range`) as any).data('daterangepicker');
        dom.setStartDate(moment(newStart).format(`YYYY-MM-DD`));
        dom.setEndDate(moment(newEnd).format(`YYYY-MM-DD`));
        dom.updateView();
        dom.updateCalendars();
    }

}