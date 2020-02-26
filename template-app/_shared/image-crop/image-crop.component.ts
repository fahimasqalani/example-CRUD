import { Component, OnInit, ViewEncapsulation, Input, ViewChild, Output, EventEmitter, ElementRef } from '@angular/core';
import { ImageCroppedEvent, ImageCropperComponent } from 'ngx-image-cropper';
import { NgxImageCompressService } from 'ngx-image-compress';

import { ServicesService } from '@services/services.service';


@Component({
    selector: "app-image-crop",
    templateUrl: "./image-crop.component.html",
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./image-crop.component.scss']
})

export class ImageCropComponent implements OnInit {

    @Input() imageChangedEvent;
    @Input() aspectRatio = '1/1'; 
    @Input() maintainAspectRatio = false;
    @Input() outputFormat = 'jpeg';
    croppedImage;

    @Output() reset: EventEmitter<any> = new EventEmitter<any>();
    @Output() uploaded: EventEmitter<any> = new EventEmitter<any>();

    @ViewChild(ImageCropperComponent, { static: false }) imageCropper: ImageCropperComponent;
    @ViewChild('closeCrop', { static: false }) closeCrop: ElementRef;

    imgCropWidth = 1000;
    imgCropHeight = 1000;


    constructor(
        private imageCompress: NgxImageCompressService,
        private _services: ServicesService) { }
  

    ngOnInit() {

    }

    ngOnChanges() {
        // to check when the uploaded file changed
        let width, height;
        let file = this.imageChangedEvent;

        if (file.type.includes('image') && !file.type.includes('image/vnd.adobe.photoshop')) {
            if (file.size > 550000000) {
                this._services.hideLoader();
            } else {
                let reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = (event: any) => {
                    let img: any = new Image();
                    img.onload = () => {
                        width = img.width;
                        height = img.height
                        if (width > this.imgCropWidth && height > this.imgCropHeight && 
                                (this.outputFormat === 'jpeg' || this.outputFormat === 'jpg')
                            ) {
                            // process img compress
                            this._services.showLoader();
                            this.imageCompress.compressFile(event.target.result, 1, 50, 50).then((result) => {
                                this.imageChangedEvent = result;
    
                                this._services.hideLoader();
                                setTimeout(() => {
                                    ($('#imageCrop') as any).modal('show');
                                })
                            })
                        } else {
                            this.imageChangedEvent = event.currentTarget.result;
                            setTimeout(() => {
                                ($('#imageCrop') as any).modal('show');
                            })
                        }
                    };
                    img.src = reader.result;
                }
            }
        } else {
            this._services.hideLoader();
            this._services.showNotification('Error', 'Only image is allowed', 'danger');
        }
    }

    imageCropped(event: ImageCroppedEvent) {
        this.croppedImage = event.file;
    }

    resetCrop() {
        this.reset.emit();
    }

    cropImage() {
        let formData = new FormData();
        formData.append('upload', this.croppedImage, 'image.png');

        // remove this and replace with the code at line 108
        let reader = new FileReader();
        reader.readAsDataURL(this.croppedImage); 
        reader.onloadend = () => {
            let base64data = reader.result;                
            this.uploaded.emit(base64data);
            this.closeCrop.nativeElement.click();
        }

        // this._services.http(`post`, this._services.upload(), formData, false, true, true, false).subscribe((response: any) => {
        //     this.uploaded.emit(response.url);
        //     this.closeCrop.nativeElement.click();
        // })
    }

}