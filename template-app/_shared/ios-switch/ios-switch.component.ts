import { Component, forwardRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

const UI_SWITCH_CONTROL_VALUE_ACCESSOR: any = {
	provide: NG_VALUE_ACCESSOR,
	useExisting: forwardRef(() => IosSwitchComponent),
	multi: true
};

@Component({
	selector: 'app-ios-switch',
	template: `
  <div class="d-flex flex-row align-items-center">
    <span style="padding-right: 8px" *ngIf="labels">{{'Off' | translate}}</span>
    <label class="iosswitch" 
    [class.active]="checked" 
    [class.disabled]="disabled"
    [class.color-success]="color == 'success'"
    [class.color-danger]="color == 'danger'"
    [class.color-info]="color == 'info'"
    [class.color-warning]="color == 'warning'"
    [class.color-dark]="color == 'dark'">
      <input class="iosswitch hide" type="checkbox" 
      [(ngModel)]="checked" 
      [disabled]="disabled"/>
    </label>
    <span style="padding-left: 8px" *ngIf="labels">{{'On' | translate}}</span>
  </div>
  `,
	styleUrls: ['./ios-switch.component.scss'],
	providers: [UI_SWITCH_CONTROL_VALUE_ACCESSOR]
})
export class IosSwitchComponent implements ControlValueAccessor {
	@Input() disable = false;
	@Input() color;
	@Input() labels = true;

	//The internal data model
	private innerValue: boolean;
	private _disabled: boolean;

	//Placeholders for the callbacks which are later providesd
	//by the Control Value Accessor
	private onTouchedCallback: (_: any) => {};
	private onChangeCallback: (_: any) => {};

	//get accessor
	get checked(): any {
		return this.innerValue;
	};

	//set accessor including call the onchange callback
	set checked(v: any) {
		if (v !== this.innerValue) {
			this.innerValue = v;
			this.onChangeCallback(v);
		}
	}

	@Input() set disabled(v: boolean) {
		this._disabled = v !== false;
	};

	get disabled() {
		return this._disabled;
	}

	//From ControlValueAccessor interface
	writeValue(value: any) {
		if (value !== this.innerValue) {
			this.innerValue = value;
		}
	}

	//From ControlValueAccessor interface
	registerOnChange(fn: any) {
		this.onChangeCallback = fn;
	}

	//From ControlValueAccessor interface
	registerOnTouched(fn: any) {
		this.onTouchedCallback = fn;
	}

}
