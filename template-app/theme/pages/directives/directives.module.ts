import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { LayoutModule } from '../../layouts/layout.module';
import { DefaultComponent } from '../default.component';
import { SharedModule } from '@shared/shared.module';

import { StickyHeaderComponent } from './sticky-header/sticky-header.component';
import { InputFocusComponent } from './input-focus/input-focus.component';

const routes: Routes = [
    {
        path: "",
        component: DefaultComponent,
        children: [
            {
                path: "sticky-header",
                component: StickyHeaderComponent
            },
            {
                path: "input-focus",
                component: InputFocusComponent
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
        StickyHeaderComponent,
        InputFocusComponent
    ], providers: [
        CurrencyPipe
    ]
})
export class DirectivesModule {

}