import { Component, OnInit, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { ACCESSIBILITY } from '../../pages/component/permissions/accessibility';

import { ServicesService } from '@services/services.service';

declare let mLayout: any;

@Component({
    selector: "app-aside-nav",
    templateUrl: "./aside-nav.component.html",
    styleUrls: ['./aside-nav.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class AsideNavComponent implements OnInit, AfterViewInit {
    pages = [];

    constructor(private _services: ServicesService) { }

    ngOnInit() {
        let user = this._services.getCurrentUser();

        if (user.accessibility && user.accessibility !== null && user.accessibility.length) {
            this.pages = user.accessibility;
        } else {
            this.setDefaultSidebar(user);
        }
    }

    setDefaultSidebar(user) {
        this.pages = ACCESSIBILITY;
    }

    ngAfterViewInit() {
        mLayout.initAside();
    }

}