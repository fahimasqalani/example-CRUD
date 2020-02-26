import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { ServicesService } from '@services/services.service';


@Component({
    selector: ".m-wrapper",
    templateUrl: "./image-crop.component.html",
    encapsulation: ViewEncapsulation.None
})

export class ImageCropComponent implements OnInit {

    imageChangedEvent: any = '';

    constructor(
        private _services: ServicesService) { }

    ngOnInit() {

    }

    onUploadFile(event) {
        let file = event.target.files[0];
        
        if (event.target.files && file) {
            this.imageChangedEvent = file;
        }
    }

    resetCrop() {
        this.imageChangedEvent = '';
    }

    setImage(url) {
        console.log(url)
    }


}