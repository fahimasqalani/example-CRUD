import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../../../_shared/shared.module';

import { LayoutModule } from '../../layouts/layout.module';
import { DefaultComponent } from '../default.component';
import { ViewSettingComponent } from './view-setting/view-setting.component';

const routes: Routes = [{
    path: '',
    component: DefaultComponent,
    children: [
        {
            path: '',
            component: ViewSettingComponent
        }
    ]
}];

@NgModule({
    imports: [
        LayoutModule,
        SharedModule,
        RouterModule.forChild(routes)
    ], exports: [
        RouterModule
    ], declarations: [
        ViewSettingComponent,
    ]
})

export class SettingModule { }