import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { LoginService } from "../_services/login.service";

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate{

    constructor(private router: Router, public auth: LoginService){}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if(!this.auth.isAuthenticated()){
            this.router.navigate(['login']);
            return false;
        }    
        return true;
    }
}