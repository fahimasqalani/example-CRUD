import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { ImageCropperModule } from 'ngx-image-cropper';
import { ColorPickerModule } from 'ngx-color-picker';

import { Select2Component } from './select2/select2.component';
import { ImageCropComponent } from './image-crop/image-crop.component';
import { ImageZoomComponent } from './image-zoom/image-zoom.component';
import { RangePickerComponent } from './range-picker/range-picker.component';
import { IosSwitchComponent } from './ios-switch/ios-switch.component';
import { DatePickerComponent } from './date-picker/date-picker.component';
import { TypeaheadComponent } from './typeahead/typeahead.component';

import { FilterPipe } from 'app/_pipes/filter.pipe';


@NgModule({
    declarations: [
        Select2Component,
        ImageCropComponent,
        ImageZoomComponent,
        RangePickerComponent,
        IosSwitchComponent,
        DatePickerComponent,
        TypeaheadComponent,
        FilterPipe
    ],
    imports: [
        CommonModule,
        FormsModule,
        TranslateModule,
        ImageCropperModule,
        ColorPickerModule
    ],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        TranslateModule,
        ColorPickerModule,
        Select2Component,
        ImageCropComponent,
        ImageZoomComponent,
        RangePickerComponent,
        IosSwitchComponent,
        DatePickerComponent,
        TypeaheadComponent,
        FilterPipe
    ]
})
export class SharedModule { }
