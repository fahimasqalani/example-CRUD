import { NgModule } from '@angular/core';
import { ThemeComponent } from './theme.component';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from "../auth/_guards/auth.guard";

const routes: Routes = [
    {
        path: "",
        component: ThemeComponent,
        canActivate: [AuthGuard],
        children: [
            {
                path: "dashboard",
                loadChildren: () => import('./pages/dashboard/dashboard.module').then(m => m.DashboardModule)
            },
            {
                path: "datatable",
                loadChildren: () => import('./pages/datatable/datatable.module').then(m => m.DatatableModule)
            },
            {
                path: "component",
                loadChildren: () => import('./pages/component/component.module').then(m => m.ComponentModule)
            },
            {
                path: "directives",
                loadChildren: () => import('./pages/directives/directives.module').then(m => m.DirectivesModule)
            },
            {
                path: "pipes",
                loadChildren: () => import('./pages/pipes/pipes.module').then(m => m.PipesModule)
            },
            {
                path: "form",
                loadChildren: () => import('./pages/form/form.module').then(m => m.FormModule)
            },
            {
                path: "charts",
                loadChildren: () => import('./pages/charts/charts.module').then(m => m.ChartsModule)
            },
            {
                path: "http",
                loadChildren: () => import('./pages/http/http.module').then(m => m.HttpModule)
            },
            {
                path: 'settings',
                loadChildren: () => import('./pages/setting/setting.module').then(m => m.SettingModule),
            },
            {
                path: "404",
                loadChildren: () => import('./pages/not-found/not-found.module').then(m => m.NotFoundModule)
            },
            {
                path: "",
                redirectTo: "dashbaord",
                pathMatch: "full"
            }
        ]
    },
    {
        path: "**",
        redirectTo: "404",
        pathMatch: "full"
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ThemeRoutingModule { }