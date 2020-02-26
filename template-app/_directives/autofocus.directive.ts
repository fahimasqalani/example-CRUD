import { Directive, OnInit, ElementRef } from '@angular/core';

@Directive({
	selector: '[focusInput]'
})
export class AutofocusDirective implements OnInit {

	constructor(private elementRef: ElementRef) { };

	ngOnInit(): void {
		setTimeout(() => {
			this.elementRef.nativeElement.focus();
		}, 80);
	}

}