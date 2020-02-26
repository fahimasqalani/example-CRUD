import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { UploadOutput } from 'ngx-uploader';

import { ServicesService } from '@services/services.service';


@Component({
    selector: ".m-wrapper",
    templateUrl: "./image-uploader.component.html",
    styleUrls: ['./image-uploader.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class ImageUploaderComponent implements OnInit {

    show = false;
    dragBeforeIndex;
    dragAfterIndex;

    imageChangedEvent;
    modalImg;

    images = [];

    constructor(
        private _services: ServicesService) { }

    ngOnInit() {

    }

    onUploadOutput(output: UploadOutput): void {
        this.show = true;
        if (output.type === 'addedToQueue' && typeof output.file !== 'undefined') {
            this.onUploadFile(output.file.nativeFile, true);
            setTimeout(() => {
                this.show = false;
            }, 5)
        } else {
            this.show = false;
        }
    }

    onUploadFile(event, ngxUpload?) {
        let file;
        if (ngxUpload === true) {
            file = event;
        } else {
            file = event.target.files[0];
        }

        if (file) {
            this.imageChangedEvent = file;
        }
    }

    setModalImg(img) {
        this.modalImg = img;
    }

    resetCrop() {
        this.imageChangedEvent = '';
    }

    getBeforeIndex(i) {
        this.dragBeforeIndex = i;
    }

    getAfterIndex(i) {
        this.dragAfterIndex = i;
        let before = this.images[this.dragBeforeIndex];
        let after = this.images[this.dragAfterIndex];

        this.images[this.dragBeforeIndex] = after;
        this.images[this.dragAfterIndex] = before;
    }

    imageReorderByIcon(i, direction) {
        this.dragBeforeIndex = i;
        if (direction === 'left') {
            this.dragAfterIndex = i - 1;
        } else {
            this.dragAfterIndex = i + 1;
        }
        this.getAfterIndex(this.dragAfterIndex);
    }

    setImage(url) {
        this.images.push({
            src: url,
            show: false
        })
    }


    remove(i) {
        this._services.swalNotification('info', 'Are you sure?', 'This image will be removed', true).then((result) => {
            if (result.value) {
                this.images.splice(i, 1);
            }
        })
    }

}