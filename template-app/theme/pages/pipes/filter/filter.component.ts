import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { ServicesService } from '@services/services.service';


@Component({
    selector: ".m-wrapper",
    templateUrl: "./filter.component.html",
    encapsulation: ViewEncapsulation.None,
})

export class FilterComponent implements OnInit {

    data = [
        'Apple', 'Orange', 'Banana'
    ]
    search = '';

    constructor(
        private _services: ServicesService) { }

    ngOnInit() {

    }



}