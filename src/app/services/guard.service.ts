import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { CVTAuthService } from "./auth.service";

@Injectable()
export class GuardService implements CanActivate {

    constructor(private _router: Router,
                private _CVTAuthService: CVTAuthService) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        if (this._CVTAuthService.token) {
            return true;
        } else {
            this._router.navigate(['auth']);
            return false;
        }
    }
}
