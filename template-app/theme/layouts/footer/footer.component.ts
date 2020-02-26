import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import * as moment from 'moment';


@Component({
    selector: "app-footer",
    templateUrl: "./footer.component.html",
    encapsulation: ViewEncapsulation.None,
})
export class FooterComponent implements OnInit {

    year = moment().format('YYYY');

    constructor() {

    }
    ngOnInit() {

    }

}