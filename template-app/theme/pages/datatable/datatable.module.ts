import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '@shared/shared.module';

import { LayoutModule } from '../../layouts/layout.module';
import { DefaultComponent } from '../default.component';

import { ServerListComponent } from './server/server-list/server-list.component';
import { ServerFormComponent } from './server/server-form/server-form.component';
import { ClientListComponent } from './client/client-list/client-list.component';
import { ReorderListComponent } from './row-reorder/reorder-list/reorder-list.component';
import { ReorderArrowComponent } from './reorder-arrow/reorder-arrow.component';
import { ReorderDragComponent } from './reorder-drag/reorder-drag.component';
import { MultiRowListComponent } from './multi-row/multi-row-list/multi-row-list.component';

const routes: Routes = [
    {
        path: '',
        component: DefaultComponent,
        children: [
            {
                path: 'server',
                component: ServerListComponent
            },
            {
                path: 'server/form/:formType',
                component: ServerFormComponent
            },
            {
                path: 'client',
                component: ClientListComponent
            },
            {
                path: 'reorder',
                component: ReorderListComponent
            },
            {
                path: 'reorderarrow',
                component: ReorderArrowComponent
            },
            {
                path: 'reorderdrag',
                component: ReorderDragComponent
            },
            {
                path: 'multirow',
                component: MultiRowListComponent
            }
        ]
    }
];

@NgModule({
    imports: [
        LayoutModule,
        SharedModule,
        RouterModule.forChild(routes)
    ], exports: [
        RouterModule
    ], declarations: [
        ServerListComponent,
        ServerFormComponent,
        ClientListComponent,
        ReorderListComponent,
        ReorderArrowComponent,
        ReorderDragComponent,
        MultiRowListComponent
    ]
})

export class DatatableModule { }