import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';
import { Helpers } from '../helpers';
import { ScriptLoaderService } from '@services/script-loader.service';
import * as pdfFonts from 'webfont/vfs_fonts_light';

declare let mApp: any;
declare let mUtil: any;
declare let mLayout: any;

@Component({
    selector: ".m-grid.m-grid--hor.m-grid--root.m-page",
    templateUrl: "./theme.component.html",
    encapsulation: ViewEncapsulation.None,
})

export class ThemeComponent implements OnInit {

    constructor(
        private _script: ScriptLoaderService,
        private _router: Router) { }

    ngOnInit() {
        this._router.events.subscribe((route) => {
            if (route instanceof NavigationStart) {
                (<any>mLayout).closeMobileAsideMenuOffcanvas();
                (<any>mLayout).closeMobileHorMenuOffcanvas();
                (<any>mApp).scrollTop();
                Helpers.setLoading(true);
                // hide visible popover
                (<any>$('[data-toggle="m-popover"]')).popover('hide');
            }
            if (route instanceof NavigationEnd) {
                // init required js
                (<any>mApp).init();
                (<any>mUtil).init();
                Helpers.setLoading(false);
                // content m-wrapper animation
                let animation = 'm-animate-fade-in-up';
                $('.m-wrapper').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(e) {
                    $('.m-wrapper').removeClass(animation);
                }).removeClass(animation).addClass(animation);
                this.setupPDFMakeFonts();
            }
        });
    }

    setupPDFMakeFonts() {
        window['pdfMake']['vfs'] = pdfFonts.pdfMake.vfs;
        window['pdfMake']['fonts'] = {
            Roboto: {
                normal: 'Roboto-Regular.ttf',
                bold: 'Roboto-Regular.ttf',
                italics: 'Roboto-Regular.ttf',
                bolditalics: 'Roboto-Regular.ttf'
            }
        }
    }


}