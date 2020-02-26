import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { LayoutModule } from '../../layouts/layout.module';
import { DefaultComponent } from '../default.component';
import { SharedModule } from '@shared/shared.module';

import { FilterComponent } from './filter/filter.component';

const routes: Routes = [
    {
        path: "",
        component: DefaultComponent,
        children: [
            {
                path: "filter",
                component: FilterComponent
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
        FilterComponent
    ], providers: [
        CurrencyPipe
    ]
})
export class PipesModule {

}