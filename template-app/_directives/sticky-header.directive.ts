import { Directive, AfterViewInit, ElementRef } from '@angular/core';

@Directive({
    selector: '[sticky-header]',
    host: { 
        '(window:scroll)': 'onScroll($event)', 
        '(window:resize)': 'onResize($event)' 
    },
})
export class StickyHeaderDirective implements AfterViewInit {
    element;
    
    constructor(private el: ElementRef) {
        this.element = el;
    }

    ngAfterViewInit() {
    }

    onResize(ev) {
        this.setStickyWidth();
    }

    onScroll(ev) {        
        if (window.pageYOffset > 50) {
            this.element.nativeElement.classList.add('m-portlet--sticky');
            this.setStickyWidth();
        } else {
            this.element.nativeElement.classList.remove('m-portlet--sticky');
            this.setStickyWidth();
        }
    }
 
    setStickyWidth() {
        let x: any = document.getElementsByClassName('m-portlet');
        
        if (x.length) {
            this.element.nativeElement.children[0].style.width = (x[0].offsetWidth + 31) + 'px';
            // return x[0].offsetWidth + 'px';
        } else {
            this.element.nativeElement.children[0].style.width = '100%';
            // return '100%'
        }
    }

}