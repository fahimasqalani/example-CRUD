import { Component, OnInit, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from '../../../app.component';

import { AppService } from '@services/app.service';


declare let mLayout: any;
@Component({
    selector: "app-header-nav",
    templateUrl: "./header-nav.component.html",
    styleUrls: ['./header-nav.component.scss'],
    encapsulation: ViewEncapsulation.None,
})

export class HeaderNavComponent implements OnInit, AfterViewInit {

    language;
    userDetails;

    constructor(
        private router: Router,
        private app: AppComponent,
        private _app: AppService) { }

    ngOnInit() {
        this.language = localStorage.getItem('language');
        this.userDetails = this._app.getCurrentUser();
    }

    ngAfterViewInit() {
        mLayout.initHeader();
    }

    logout() {
        this._app.logout();
    }

    changeLanguage(lang) {
        this.language = lang;
        localStorage.setItem('language', this.language);
        this.app.setLanguage();

        setTimeout(() => {
            let url = this.router.url;
            this.router.navigateByUrl('/').then(() => {
                this.router.navigate([url]);
            })
        }, 5)
    }

}