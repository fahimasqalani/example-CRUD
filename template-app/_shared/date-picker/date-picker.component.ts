import { Component, OnInit, ViewEncapsulation, Input, Output, EventEmitter } from '@angular/core';

import * as moment from 'moment';


@Component({
    selector: "app-date-picker",
    templateUrl: "./date-picker.component.html",
    styleUrls: ['./date-picker.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class DatePickerComponent implements OnInit {

    isInit = false;
    formattedFormat;

    @Input() id = 'm_datepicker';
    @Input() defaultDate = '';
    @Input() format = 'yyyy-mm-dd';
    @Input() isMonthPicker = false;
    @Input() isYearPicker = false;
    @Input() outputFormat = '';
    @Input() placeholder = 'Choose Date';

    @Input() min = '';
    @Input() max = '';

    @Output() outputDate: EventEmitter<any> = new EventEmitter<any>();

    constructor() { }

    ngOnInit() {
        this.formattedFormat = this.format.toUpperCase();
    }

    ngAfterViewInit() {
        this.init();
    }

    ngOnChanges(e) {
        if (e.defaultDate.previousValue && e.defaultDate.currentValue !== e.defaultDate.previousValue) {
            // ($(`#${this.id}`) as any).datepicker('setDate', moment(e.defaultDate.currentValue).format(this.formattedFormat));

            let format = this.outputFormat.toUpperCase();
            let value = e.defaultDate.currentValue;
            if (!this.isYearPicker) {
                ($(`#${this.id}`) as any).datepicker().val(moment(value).format(format)).trigger('change');
            } else {
                ($(`#${this.id}`) as any).datepicker().val(value).trigger('change');
            }

        }
    }

    init() {
        let config = {
            autoclose: true,
            todayHighlight: true,
            orientation: "bottom left",
            format: this.format,
            templates: {
                leftArrow: '<i class="la la-angle-left"></i>',
                rightArrow: '<i class="la la-angle-right"></i>'
            },
            startDate: this.min ? moment(this.min).format(this.formattedFormat) : '',
            endDate: this.max ? moment(this.max).format(this.formattedFormat) : '',
            language: localStorage.getItem('language') || 'en'
        }

        if (this.isMonthPicker) {
            this.formattedFormat = this.format.toUpperCase();
            config['format'] = this.format;
            config['startView'] = 'months';
            config['minViewMode'] = 'months';
            // config['maxViewMode'] = 'months';
        }

        if (this.isYearPicker) {
            config['viewMode'] = 'years';
            config['minViewMode'] = 'years';
        }

        ($(`#${this.id}`) as any).datepicker(config);

        // set default date as current date
        ($(`#${this.id}`) as any).datepicker('setDate', moment(this.defaultDate).format(this.formattedFormat));

        ($(`#${this.id}`) as any).datepicker().on('changeDate', (ev) => {
            this.outputDate.emit(moment(ev.date).format(this.outputFormat ? this.outputFormat : this.formattedFormat));
        });

        // disabled dates
        // let disabledDates = [
        //     '2019-12-23', '2019-12-24', '2019-12-25'
        // ];
        // ($(`#${this.id}`) as any).datepicker('setDatesDisabled', disabledDates);

        this.isInit = true;
    }

}