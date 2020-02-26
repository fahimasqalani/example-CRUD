import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { ServicesService } from '@services/services.service';


@Component({
    selector: ".m-wrapper",
    templateUrl: "./sticky-header.component.html",
    encapsulation: ViewEncapsulation.None,
})

export class StickyHeaderComponent implements OnInit {

    constructor(
        private _services: ServicesService) { }

    ngOnInit() {

    }



}