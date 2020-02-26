import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { LayoutModule } from '../../layouts/layout.module';
import { DefaultComponent } from '../default.component';
import { SharedModule } from '@shared/shared.module';

import { ChartsComponent } from './charts.component';

const routes: Routes = [
    {
        path: "",
        component: DefaultComponent,
        children: [
            {
                path: "",
                component: ChartsComponent
            }
        ]
    }
];
@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        LayoutModule,
        SharedModule
    ], exports: [
        RouterModule
    ], declarations: [
        ChartsComponent
    ]
})
export class ChartsModule {

}