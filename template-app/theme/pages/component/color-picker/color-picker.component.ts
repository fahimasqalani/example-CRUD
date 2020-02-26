import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { ServicesService } from '@services/services.service';


@Component({
    selector: ".m-wrapper",
    templateUrl: "./color-picker.component.html",
    encapsulation: ViewEncapsulation.None
})

export class ColorPickerComponent implements OnInit {

    colorCode = '#9c5b56';

    constructor(
        private _services: ServicesService) { }

    ngOnInit() {

    }

}