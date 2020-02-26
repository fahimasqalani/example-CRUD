import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { ServicesService } from '@services/services.service';


@Component({
    selector: ".m-wrapper",
    templateUrl: "./switch.component.html",
    encapsulation: ViewEncapsulation.None
})

export class SwitchComponent implements OnInit {

    value = true;

    constructor(
        private _services: ServicesService) { }

    ngOnInit() {

    }

}