import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router } from "@angular/router";
import { JwtHelperService } from "@auth0/angular-jwt";
import { LoginService } from "../_services/login.service";

@Injectable()

export class RoleGuardService implements CanActivate{
    constructor(public auth: LoginService, public router: Router){}
    canActivate(route: ActivatedRouteSnapshot): boolean{
        let jwtHelper = new JwtHelperService();
        const expectedRole = route.data.expectedRole;
        const token = localStorage.getItem('token');
        const tokenPayload = jwtHelper.decodeToken(token);
        if(!this.auth.isAuthenticated() || tokenPayload.sub !== expectedRole){
            this.router.navigate(['login']);
            return false;
        }
        return true;
    }
}