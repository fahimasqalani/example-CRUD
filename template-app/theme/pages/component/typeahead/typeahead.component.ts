import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { UploadOutput } from 'ngx-uploader';

import { ServicesService } from '@services/services.service';


@Component({
    selector: ".m-wrapper",
    templateUrl: "./typeahead.component.html",
    styleUrls: ['./typeahead.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class TypeaheadComponent implements OnInit {

    url = `http://139.59.226.52:10000/v1/fruit/search`;
    displayParam = {
        key: 'id',
        name: 'name',
        name2: '',
        second: 'price'
    }

    products = [
        {
            name: 'A'
        },
        {
            name: 'B'
        }
    ]

    constructor(
        private _services: ServicesService) { }

    ngOnInit() {

    }

    outputData(e) {
        console.log(e)
    }

    addList() {
        let arr = [];
        for (let p of this.products) {
            arr.push(p.name);
            let newOption = new Option(p.name, p.name, false, false);
            ($('#picker') as any).select2().append(newOption).trigger('change');
        }
        ($('#picker') as any).select2().val(arr).trigger('change');
    }

}