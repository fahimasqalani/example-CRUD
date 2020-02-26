import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import * as _ from 'lodash';

import { ServicesService } from '@services/services.service'


@Component({
    selector: ".m-wrapper",
    templateUrl: "./server-form.component.html",
    styleUrls: ['./server-form.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class ServerFormComponent implements OnInit {

    form: any;
    formType;
    id;
    data;

    constructor(
        private route: ActivatedRoute,
        private _services: ServicesService) {
            this.route.params.subscribe(params =>
                this.formType = params['formType']
            );
            this.route.queryParams.subscribe(params =>
                this.id = params['data']
            );
    }

    ngOnInit() {
        this.initForm();
        if (this.formType === 'edit') {
            this.id = this._services.decryption(this.id, true);
            this.getOneRecord();
        }
    }

    initForm() {
        this.form = new FormGroup({
            name: new FormControl(null, Validators.required),
            price: new FormControl(null, Validators.required)
        })
    }

    getOneRecord() {
      
    }

    onSubmit() {
        if (this.form.invalid) {
            this._services.markFormGroupTouched(this.form);
            return;
        }
        let data = this.form.value;
        data['id'] = this.id;
    }

    getTwoDecimal(name) {
        let data = this.form.controls[name];

        if (isNaN(data.value)) {
            let x = data.value.toString();
            x = x.replace(/\D/g, '');
            if (x) {
                this.form.controls[name].setValue(Number(x).toFixed(2));
            } else {
                this.form.controls[name].setValue(null);
            }
        } else {
            if(data.value >= 0) {
                this.form.controls[name].setValue(Number(data.value).toFixed(2));
            } else {
                this.form.controls[name].setValue(null);
            }
        }
    }

    validateNumber(e) {
        let charCode: any = (e.which) ? e.which : event['keyCode']
        if (charCode > 31 && (charCode < 48 || charCode > 57)) {
            return false;
        } else {
            return true;
        }
    }

}