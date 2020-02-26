import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { ServicesService } from '@services/services.service';


@Component({
    selector: ".m-wrapper",
    templateUrl: "./image-zoom.component.html",
    encapsulation: ViewEncapsulation.None
})

export class ImageZoomComponent implements OnInit {

    imageUrl = './assets/images/fs.png';
    modalImg;

    constructor(
        private _services: ServicesService) { }

    ngOnInit() {

    }

    zoomImage() {
        this.modalImg = this.imageUrl;
        setTimeout(() => {
            ($('#image') as any).modal('show');
        }, 10)
    }

}