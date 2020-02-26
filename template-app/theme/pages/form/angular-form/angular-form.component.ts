import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { ServicesService } from '@services/services.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
    selector: ".m-wrapper",
    templateUrl: "./angular-form.component.html",
    encapsulation: ViewEncapsulation.None
})

export class AngularFormComponent implements OnInit {

    form: any;

    constructor(
        private _services: ServicesService) { }

    ngOnInit() {
        this.initForm();
    }

    initForm() {
        this.form = new FormGroup({
            name: new FormControl(null, Validators.required),
            notAllow: new FormControl({ value: null, disabled: true }, Validators.required),
            description: new FormControl(null),
            email: new FormControl(null, [Validators.required, Validators.email]),
            presetValue: new FormControl('Hello', Validators.required),
        })
    }

    noSubmit() {
        if (this.form.invalid) {
            this._services.markFormGroupTouched(this.form);
            return;
        }
    }

}