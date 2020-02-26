import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { ServicesService } from '@services/services.service';


@Component({
    selector: ".m-wrapper",
    templateUrl: "./select-picker.component.html",
    encapsulation: ViewEncapsulation.None
})

export class SelectPickerComponent implements OnInit {

    data = 1;
    list = [
        {
            id: 1,
            name: 'Name 1'
        },
        {
            id: 2,
            name: 'Name 2'
        },
        {
            id: 3,
            name: 'Name 3'
        }
    ]

    constructor(
        private _services: ServicesService) { }

    ngOnInit() {

    }

    ngAfterViewInit() {
        ($('#picker') as any).selectpicker();
    }

}