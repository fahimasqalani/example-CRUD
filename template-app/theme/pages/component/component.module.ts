import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '@shared/shared.module';

import { LayoutModule } from '../../layouts/layout.module';
import { DefaultComponent } from '../default.component';
import { NgxUploaderModule } from 'ngx-uploader';

import { DateRangePickerComponent } from './date-range-picker/date-range-picker.component';
import { DatePickerComponent } from './date-picker/date-picker.component';
import { ImageZoomComponent } from './image-zoom/image-zoom.component';
import { ImageCropComponent } from './image-crop/image-crop.component';
import { SelectTwoComponent } from './select2/select2.component';
import { FullCalendarComponent } from './full-calendar/full-calendar.component';
import { SelectPickerComponent } from './select-picker/select-picker.component';
import { ColorPickerComponent } from './color-picker/color-picker.component';
import { SwitchComponent } from './switch/switch.component';
import { ImageUploaderComponent } from './image-uploader/image-uploader.component';
import { TypeaheadComponent } from './typeahead/typeahead.component';
import { PermissionsComponent } from './permissions/permissions.component';
import { ImageDownloadComponent } from './image-download/image-download.component';

const routes: Routes = [
    {
        path: '',
        component: DefaultComponent,
        children: [
            {
                path: 'daterangepicker',
                component: DateRangePickerComponent
            },
            {
                path: 'datepicker',
                component: DatePickerComponent
            },
            {
                path: 'image-zoom',
                component: ImageZoomComponent
            },
            {
                path: 'image-crop',
                component: ImageCropComponent
            },
            {
                path: 'select2',
                component: SelectTwoComponent
            },
            {
                path: 'fullcalendar',
                component: FullCalendarComponent
            },
            {
                path: 'selectpicker',
                component: SelectPickerComponent
            },
            {
                path: 'colorpicker',
                component: ColorPickerComponent
            },
            {
                path: 'switch',
                component: SwitchComponent
            },
            {
                path: 'image-uploader',
                component: ImageUploaderComponent
            },
            {
                path: 'typeahead',
                component: TypeaheadComponent
            },
            {
                path: 'permissions',
                component: PermissionsComponent
            },
            {
                path: 'image-download',
                component: ImageDownloadComponent
            }
        ]
    }
];

@NgModule({
    imports: [
        LayoutModule,
        SharedModule,
        RouterModule.forChild(routes),
        NgxUploaderModule
    ], exports: [
        RouterModule
    ], declarations: [
        DateRangePickerComponent,
        DatePickerComponent,
        ImageZoomComponent,
        ImageCropComponent,
        SelectTwoComponent,
        FullCalendarComponent,
        SelectPickerComponent,
        ColorPickerComponent,
        SwitchComponent,
        ImageUploaderComponent,
        TypeaheadComponent,
        PermissionsComponent,
        ImageDownloadComponent
    ]
})

export class ComponentModule { }