import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { ServicesService } from '@services/services.service';


@Component({
    selector: ".m-wrapper",
    templateUrl: "./input-focus.component.html",
    encapsulation: ViewEncapsulation.None,
})

export class InputFocusComponent implements OnInit {

    constructor(
        private _services: ServicesService) { }

    ngOnInit() {

    }



}