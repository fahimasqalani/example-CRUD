import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';
import { Helpers } from "./helpers";
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'body',
    templateUrl: './app.component.html',
    encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements OnInit {
    title = 'app';
    globalBodyClass = `m-page--fluid m--skin- m-content--skin-light2 m-header--fixed m-header--fixed-mobile m-aside-left--enabled m-aside-left--skin-dark 
        m-aside-left--fixed m-aside-left--offcanvas m-footer--push m-aside--offcanvas-default`;

    constructor(
        private _router: Router, 
        private translate: TranslateService) {
    }

    ngOnInit() {
        this._router.events.subscribe((route) => {
            if (route instanceof NavigationStart) {
                Helpers.setLoading(true);
                Helpers.bodyClass(this.globalBodyClass);
            }
            if (route instanceof NavigationEnd) {
                Helpers.setLoading(false);
            }
        });
        this.setLanguage();
    }

    setLanguage() {
        let lang = localStorage.getItem('language');
        if (lang) {
            this.translate.use(lang);
        } else {
            localStorage.setItem('language', 'en');
            this.translate.use('en');
        }
    }
}