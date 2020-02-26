import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs/Rx";
import { AppService } from '@services/app.service';

@Injectable()
export class Guard implements CanActivate {

    constructor(private _router: Router, private app: AppService) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
        return true;
    }

    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot
    ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        let subPath = route.url[0];

        // replace the empty string with the first layer PATH
        // validateAccessbility() with handle the rest
        let valid = this.app.validateAccessbility('', subPath);
        let url = this._router.url;
        if (valid) {
            return true;
        } else {
            this._router.navigateByUrl('/').then(() => {
                this._router.navigate([url])
            })
            return false;
        }
    }

}