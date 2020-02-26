import { Injectable } from '@angular/core';
import { AppService } from './app.service';


@Injectable()
export class ServicesService extends AppService {

    /*
        write all APIs here.

        for normal =>
        getDashboard() {
            return `/dashboard`;
        }

        for datatable => {
            return `${this.SERVER_ADDRESS}/table`;
        }

    */

    login() {
        return `/v3/login`;
    }

    upload() {
        return `/v6/upload`;
    }

    getExample() {
        return `/v1/fruit`;
    }

    excelAPIPath() {
        return `/`;
    }

    getDatatableData() {
        return `/v2/vegetable/datatable`;
    }

    api1() {
        return `api1/path`;
    }

    api2() {
        return `api2/path`;
    }
    
}
