import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

import { AppService } from './app.service';
import { ServicesService } from './services.service';

@NgModule({
    imports: [
        CommonModule,
        HttpClientModule
    ], exports: [

    ], declarations: [

    ], providers: [
        AppService,
        ServicesService,
        CookieService
    ]
})

export class ServicesModule { }