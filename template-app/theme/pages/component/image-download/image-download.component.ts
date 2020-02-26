import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { ServicesService } from '@services/services.service';


@Component({
    selector: ".m-wrapper",
    templateUrl: "./image-download.component.html",
    encapsulation: ViewEncapsulation.None
})

export class ImageDownloadComponent implements OnInit {

    base64data;

    constructor(
        private _services: ServicesService) { }

    ngOnInit() {

    }

    download() {
        let url = 'https://flexsolver.sgp1.digitaloceanspaces.com/CSS/banners/Flex-Solver-077a2cf9-54fe-41dd-832e-d43ecece8e42.png';

        // re-init flexHttp with image URL
        this._services.flexHttp.init({
            rootURL: url,
        })

        // no matter success or fail will need to re-init the flexHttp with default settings
        this._services.http(`get`,'', false, false, false, false, true).subscribe((response: any) => {
            this._services.initFlexHttp();

            let reader: any = new FileReader();
            reader.readAsDataURL(response.body); 
            reader.onloadend = () => {
                this.base64data = reader.result;
                console.log(this.base64data)
            }
        }, (err) => {
            this._services.initFlexHttp();
        })
    }

}