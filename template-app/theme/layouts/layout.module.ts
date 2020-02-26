import { NgModule } from '@angular/core';
import { LayoutComponent } from './layout/layout.component';
import { HeaderNavComponent } from './header-nav/header-nav.component';
import { DefaultComponent } from '../pages/default.component';
import { AsideNavComponent } from './aside-nav/aside-nav.component';
import { FooterComponent } from './footer/footer.component';
import { ScrollTopComponent } from './scroll-top/scroll-top.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HrefPreventDefaultDirective } from '../../_directives/href-prevent-default.directive';
import { UnwrapTagDirective } from '../../_directives/unwrap-tag.directive';
import { StickyHeaderDirective } from 'app/_directives/sticky-header.directive';
import { AutofocusDirective } from 'app/_directives/autofocus.directive';

import { SharedModule } from '../../_shared/shared.module';

@NgModule({
    declarations: [
        LayoutComponent,
        HeaderNavComponent,
        DefaultComponent,
        AsideNavComponent,
        FooterComponent,
        ScrollTopComponent,
        HrefPreventDefaultDirective,
        UnwrapTagDirective,
        StickyHeaderDirective,
        AutofocusDirective
    ],
    exports: [
        LayoutComponent,
        HeaderNavComponent,
        DefaultComponent,
        AsideNavComponent,
        FooterComponent,
        ScrollTopComponent,
        HrefPreventDefaultDirective,
        StickyHeaderDirective,
        AutofocusDirective
    ],
    imports: [
        CommonModule,
        RouterModule,
        SharedModule
    ]
})
export class LayoutModule {
}