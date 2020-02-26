import { Component, OnInit, ViewEncapsulation, ViewChild, ElementRef } from '@angular/core';
import * as moment from 'moment';

import { ServicesService } from '@services/services.service';


@Component({
    selector: ".m-wrapper",
    templateUrl: "./full-calendar.component.html",
    encapsulation: ViewEncapsulation.None
})

export class FullCalendarComponent implements OnInit {

    calendarEvents = [];
    rerender = false;
    changeMonth = false;
    currentMonth = moment().format('YYYY-MM-DD');
    selectedEvent: any;

    @ViewChild('eventModal', { static: false }) eventModal: ElementRef;

    constructor(
        private _services: ServicesService) { }

    ngOnInit() {
        this.initCalendar();
    }

    initCalendar() {
        let that = this;
        ($("#m_calendar") as any).fullCalendar({
            header: { left: "prev, next today", center: "title", right: "agendaDay, agendaWeek, month, listWeek" },
            buttonText: {
                today: this._services.translate.instant('Today'),
                month: this._services.translate.instant('Month'),
                week: this._services.translate.instant('Week'),
                day: this._services.translate.instant('Day'),
                list: this._services.translate.instant('List'),
            },
            eventLimit: !0,
            defaultView: 'agendaDay',
            minTime: '07:00:00',
            // maxTime: '22:00:00',
            // displayEventTime: 1,
            // googleCalendarApiKey: "AIzaSyDcnW6WejpTOCffshGDDb4neIrXVUA1EAE",
            googleCalendarApiKey: "AIzaSyC_cHEGmzoajPzRZk5oNytPL5HNIJ5z8Qw",
            eventSources: [
                {
                    events: this.calendarEvents
                },
                {
                    googleCalendarId: "en.singapore#holiday@group.v.calendar.google.com"
                }, 
                // {
                //     googleCalendarId: "flexsolver@gmail.com",
                //     className: "company-calendar"
                // },
                // {
                //     googleCalendarId: "en.malaysia#holiday@group.v.calendar.google.com"
                // }
            ],
            // events: "en.singapore#holiday@group.v.calendar.google.com",
            eventClick: function(e, i) {
                that.initSelectedEvent();
                if (e['url']) {
                    return window.open(e.url, "gcalevent", "width=700, height=600"), !1
                } else {
                    that.initExistingEvent(e);
                    setTimeout(() => {
                        return that.eventModal.nativeElement.click();
                    }, 5)
                }
            },
            viewRender: function(view, element) {
                let x = ($('#m_calendar') as any).fullCalendar('getDate');
                x = moment(x).format('YYYY-MM-DD');
                if (x !== that.currentMonth) {
                    that.changeMonth = true;
                    that.currentMonth = x;
                    that.getOneRecords(true);
                } else {
                    ($('#m_calendar') as any).fullCalendar('removeEvents');
                    ($('#m_calendar') as any).fullCalendar('renderEvents', that.calendarEvents);
                }
            },
        })
    }

    initSelectedEvent() {
        this.selectedEvent = {};
        this.selectedEvent['type'] = 'NEW';
        this.selectedEvent['projectName'] = '';

        if(this.calendarEvents.length) {
            this.calendarEvents.sort((a,b) => 
                new Date(b.endDate).getTime() - new Date(a.endDate).getTime()
            );
            let first = this.calendarEvents[0].endDate;
            this.selectedEvent['startDate'] = moment(first).format('YYYY-MM-DD HH:mm');
        } else {
            this.selectedEvent['startDate'] = moment().format('YYYY-MM-DD HH:mm');
        }

        this.selectedEvent['endDate'] = null;
        this.selectedEvent['duration'] = null;
        this.selectedEvent['durationType'] = 'hours';
        this.selectedEvent['remark'] = '';

        this.selectedEvent['color'] = 'primary';
    }

    initExistingEvent(e) {
        this.selectedEvent['type'] = 'EDIT';
        this.selectedEvent['projectName'] = e.projectName;
        this.selectedEvent['projectId'] = e.projectId;

        this.selectedEvent['startDate'] = e.startDate;
        this.selectedEvent['endDate'] = e.endDate;
        this.selectedEvent['duration'] = e.duration;
        this.selectedEvent['durationType'] = e.durationType;
        this.selectedEvent['remark'] = e.remark;

        this.selectedEvent['color'] = e.color;
    }

    getOneRecords(viewNext?) {
        // this._services.http(`get`, this._services.getOneMilestone(this.id), {}, false, true, false, false).subscribe((response: any) => {
        //     this.data = response.data;
        //     this.calendarEvents = response.data.json || [];
            
        //     this.initCalendar();
        //     ($('#m_calendar') as any).fullCalendar('removeEvents');
        //     ($('#m_calendar') as any).fullCalendar('renderEvents', this.calendarEvents);
            
        //     if(viewNext === undefined) {
        //         if(this.data.submittedTimestamp) {
        //             ($('#m_calendar') as any).fullCalendar('gotoDate', moment(this.data.submittedTimestamp).format('YYYY-MM-DD'));
        //         } else if(this.data.createdTimestamp) {
        //             ($('#m_calendar') as any).fullCalendar('gotoDate', moment(this.data.createdTimestamp).format('YYYY-MM-DD'));
        //         }
        //     }
            
        //     if (!this.changeMonth) {
        //         this.changeMonth = false;
        //         this.initCalendar();
        //     }
        // }, (err) => {
        //     this._services.router.navigate(['/milestone']);
        // })
    }


}