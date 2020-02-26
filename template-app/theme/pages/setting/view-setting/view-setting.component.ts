import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import * as CryptoJS from 'crypto-js';

import { ServicesService } from '@services/services.service';
import { AppComponent } from '../../../../app.component'

@Component({
    selector: '.m-wrapper',
    templateUrl: './view-setting.component.html',
    styleUrls: ['./view-setting.component.scss'],
    encapsulation: ViewEncapsulation.None
})


export class ViewSettingComponent implements OnInit {

    userDetails;
    language;

    form: FormGroup;
    changePass = false;

    constructor(
        private _services: ServicesService) { }

    ngOnInit() {
        this.language = localStorage.getItem('language');
        this.getProfileDetails();
        this.initForm();
    }

    getProfileDetails() {
        this.userDetails = this._services.getCurrentUser();
    }

    changeLanguage() {
        localStorage.setItem('language', this.language)
        this._services.translate.use(this.language)
    }

    initForm() {
        this.form = new FormGroup({
            oldPassword: new FormControl(null, Validators.required),
            newPassword: new FormControl(null, [
                Validators.required,
                // Validators.minLength(6)
            ]),
            newPasswordAgain: new FormControl(null, [Validators.required, this.isNewPasswordsSame()]),
        })
    }

    isNewPasswordsSame(): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } => {
            let isInvalid = true;

            if (this.form && this.form.get('newPassword').value === this.form.get('newPasswordAgain').value) {
                isInvalid = false
            }

            return isInvalid ? { 'doNotMatch': true } : null;
        };
    }

    cancelChange() {
        this.changePass = false;
        this.form.reset();
    }

    onSubmit() {
        let data: any = {};
        if (this.form.invalid) {
            this._services.markFormGroupTouched(this.form);
            return;
        }
        data['oldPassword'] = CryptoJS.HmacSHA256(this.form.value.oldPassword, '652ahscamHtset').toString();
        data['newPassword'] = CryptoJS.HmacSHA256(this.form.value.newPassword, '652ahscamHtset').toString();
    }

}
