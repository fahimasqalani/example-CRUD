import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ServicesService } from '@services/services.service';

@Component({
    selector: "app-http",
    templateUrl: "./http.component.html",
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./http.component.scss']
})

export class HttpComponent implements OnInit {

    constructor(
        private _services: ServicesService) { }


    ngOnInit() {
        
    }

    ngAfterViewInit() {
        
    }

    http() {
        // type 1
        let list = [
            this._services.api1() ||  `api1/path`,
            this._services.api2() ||  `api2/path`
        ]

        // type 2
        let list1 = [
            {
                type: `get`,
                api:  this._services.api1() ||  `api1/path`,
                value: {}
            },
            {
                type: `get`,
                api:  this._services.api2() ||  `api2/path`,
                value: {}
            }
        ]

        this._services.forkHttp(list, true).subscribe((response: any) => {
            // repsonse will be in array according the api sequence declare up there
            // default will take it as 'GET' type as most of time time forkjoin will use
            // to get resources

            console.log(response[0]) // return for api1
            console.log(response[1]) // return for api2
        })
    }

}