import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';

@Component({
    selector: "app-image-zoom",
    templateUrl: "./image-zoom.component.html",
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./image-zoom.component.scss']
})

export class ImageZoomComponent implements OnInit {

    @Input() modalImg;

    constructor() { }

    ngOnInit() {

    }

}