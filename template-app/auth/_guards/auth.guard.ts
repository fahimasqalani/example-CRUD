import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs/Rx";
import { ServicesService } from '@services/services.service';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(
        private _services: ServicesService,
        private _router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
        try {
            let token = this._services.getToken();
            if (token) {
                return true;
            } else {
                this._router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
                return false;
            }
        } catch (e) {
            this._router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
            return false;
        }
    }
}