import { Component, OnInit, ViewEncapsulation, Input, Output, EventEmitter } from '@angular/core';
import * as moment from 'moment';
import * as _ from "lodash";

import { ServicesService } from '@services/services.service';

@Component({
    selector: "app-range-picker",
    templateUrl: "./range-picker.component.html",
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./range-picker.component.scss']
})

export class RangePickerComponent implements OnInit {

    @Input() id = 'date_range';
    @Input() body;
    @Input() isTimePicker = false;
    @Input() minDate = '';
    @Input() maxDate = moment().endOf('day');
    @Input() localeFormat = `YYYY-MM-DD`;
    @Input() presetSelection = true;
    @Input() open = 'right'; // left/right/center
    @Input() drop = 'down' // down/up

    @Output() output: EventEmitter<any> = new EventEmitter<any>();

    hourStartFormat = ``;
    hourEndFormat = ``;
    HTMLDisplay = ``;

    constructor(
        private _services: ServicesService,
    ) { }

    ngOnInit() {

    }

    ngAfterViewInit() {
        this.init();
    }

    ngOnChanges() {
        this.init();
    }

    init() {
        this.HTMLDisplay = this.localeFormat;
        if (this.isTimePicker) {
            this.hourStartFormat = ` HH:mm:ss`;
            this.hourEndFormat = ` HH:mm:ss`;
            this.HTMLDisplay = `${this.localeFormat} HH:mm`;
        }

        let x = this.dateRangeConfig(this.isTimePicker, this.minDate, this.maxDate, this.localeFormat, this.presetSelection);
        let custom = {};

        ($(`#${this.id}`) as any).daterangepicker(_.merge(x, custom));
        $(`#${this.id}`).on('apply.daterangepicker', (ev, picker) => {
            this.body.startDate = picker.startDate.format(`${this.localeFormat}${this.hourStartFormat}`);
            this.body.endDate = picker.endDate.format(`${this.localeFormat}${this.hourEndFormat}`);

            this.outputEvent();
        });

        if (this.presetSelection) {
            $('.range_inputs').append(`
                <div class="d-flex m--margin-top-15">
                    <button id="c-left" class="m-btn btn btn-primary">
                        <i class="fa fa-chevron-left glyphicon glyphicon-chevron-left"></i>
                    </button>
                    <button id="c-right" class="m-btn btn btn-primary">
                        <i class="fa fa-chevron-right glyphicon glyphicon-chevron-right"></i>
                    </button>
                </div>
            `);
    
            $('#c-left').on('click', () => {
                this.updateCalendarDate('left');
            });
            $('#c-right').on('click', () => {
                this.updateCalendarDate('right');
            });
        }
    }

    updateCalendarDate(type) {
        let newStart, newEnd;

        if (type === 'left') {
            newStart = moment(this.body.startDate).subtract(1, 'days').format(`${this.localeFormat}${this.hourStartFormat}`);
            newEnd =  moment(this.body.endDate).subtract(1, 'days').format(`${this.localeFormat}${this.hourEndFormat}`)
        } else {
            if (
                !moment(moment(this.body.endDate).format(`${this.localeFormat}${this.hourStartFormat}`)).isSame(moment().format(`${this.localeFormat}${this.hourEndFormat}`))
                ) {
                    newStart = moment(this.body.startDate).add(1, 'days').format(`${this.localeFormat}${this.hourStartFormat}`);
                    newEnd =  moment(this.body.endDate).add(1, 'days').format(`${this.localeFormat}${this.hourEndFormat}`)
            }
        }

        if (newStart && newEnd) {
            this.body.startDate = newStart;
            this.body.endDate = newEnd;
    
            let dom: any = ($(`#${this.id}`) as any).data('daterangepicker');
            dom.setStartDate(moment(this.body.startDate).format(`${this.localeFormat}${this.hourStartFormat}`));
            dom.setEndDate(moment(this.body.endDate).format(`${this.localeFormat}${this.hourEndFormat}`));
            dom.updateView();
            dom.updateCalendars();
            
            // update html display
            let range: any = document.getElementById(`${this.id}`);
            range.value = moment(this.body.startDate).format(this.localeFormat) + ' - ' + moment(this.body.endDate).format(this.localeFormat);
    
            this.outputEvent();
        }
    }

    ngOnDestroy() {
        let daterangepicker: any = document.getElementsByClassName('daterangepicker');
        for (let x of daterangepicker) {
            x.remove();
        }
    }

    outputEvent() {
        this.output.emit(this.body);
    }

    dateRangeConfig(isTimePicker?, minDate?, maxDate?, inputLocaleFormat?, presetSelection?) {
        // custom range doesn't support translation
        // therefore using this way
        let r = {}
        let today = this._services.translate.instant('Today');
        let yesterday = this._services.translate.instant('Yesterday');
        let last7Days = this._services.translate.instant('Last 7 Days');
        let last30Days = this._services.translate.instant('Last 30 Days');
        let last90Days = this._services.translate.instant('Last 90 Days');

        // to control date range picker format
        let hourStartFormat = ``;
        let hourEndFormat = ``;
        let localeFormat = inputLocaleFormat;
        let localeDisplay = localeFormat;

        if (isTimePicker) {
            hourStartFormat = ` 00:00:00`;
            hourEndFormat = ` 23:59:59`;
            localeDisplay = `${localeFormat} HH:mm`;
        }

        r[today] = [moment().format(`${localeFormat}${hourStartFormat}`), moment().format(`${localeFormat}${hourEndFormat}`)];
        r[yesterday] = [moment().subtract(1, 'days').format(`${localeFormat}${hourStartFormat}`), moment().subtract(1, 'days').format(`${localeFormat}${hourEndFormat}`)];
        r[last7Days] = [moment().subtract(6, 'days').format(`${localeFormat}${hourStartFormat}`), moment().format(`${localeFormat}${hourEndFormat}`)];
        r[last30Days] = [moment().subtract(29, 'days').format(`${localeFormat}${hourStartFormat}`), moment().format(`${localeFormat}${hourEndFormat}`)];
        r[last90Days] = [moment().subtract(89, 'days').format(`${localeFormat}${hourStartFormat}`), moment().format(`${localeFormat}${hourEndFormat}`)];

        const config = {
            opens: this.validateOpens(),
            drops: this.validateDrops(),
            buttonClasses: 'm-btn btn',
            applyClass: 'btn-primary',
            cancelClass: 'btn-secondary',
            showDropdowns: true,
            timePicker: isTimePicker === true ? true : false,
            timePickerIncrement: 1,
            timePicker24Hour: isTimePicker === true ? true : false,
            timePickerSeconds: false,
            locale: {
                format: localeDisplay,
                applyLabel: this._services.translate.instant('Apply'),
                cancelLabel: this._services.translate.instant('Cancel'),
                customRangeLabel: this._services.translate.instant('Custom Range'),
                daysOfWeek: [
                    this._services.translate.instant("Su"),
                    this._services.translate.instant("Mo"),
                    this._services.translate.instant("Tu"),
                    this._services.translate.instant("We"),
                    this._services.translate.instant("Th"),
                    this._services.translate.instant("Fr"),
                    this._services.translate.instant("Sa")
                ],
                monthNames: [
                    this._services.translate.instant("Jan"),
                    this._services.translate.instant("Feb"),
                    this._services.translate.instant("Mar"),
                    this._services.translate.instant("Apr"),
                    this._services.translate.instant("May"),
                    this._services.translate.instant("Jun"),
                    this._services.translate.instant("Jul"),
                    this._services.translate.instant("Aug"),
                    this._services.translate.instant("Sep"),
                    this._services.translate.instant("Oct"),
                    this._services.translate.instant("Nov"),
                    this._services.translate.instant("Dec")
                ]
            }
        }
        if (minDate) {
            config['minDate'] = minDate;
        }
        if (maxDate) {
            config['maxDate'] = maxDate;
        }
        if (presetSelection && presetSelection === true) {
            config['ranges'] = r;
        }
        return config;
    }

    validateOpens() {
        let d = 'right';
        let opens = ['left', 'right', 'center'];
        for (let o of opens) {
            if (o === this.open) {
                return o;
            }
        }
        return d;
    }
    
    validateDrops() {
        let d = 'down';
        let drops = ['down', 'up'];
        for (let d of drops) {
            if (d === this.drop) {
                return d;
            }
        }
        return d;
    }


}