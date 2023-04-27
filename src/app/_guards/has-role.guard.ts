import { inject, Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanMatch,
  CanLoad,
  Route,
} from '@angular/router';
import { map, Observable, tap } from 'rxjs';
import { AuthenticationService } from '../_services';
import { Role, Usuario } from '../_models';

@Injectable({
  providedIn: 'root',
})
export class HasRoleGuard implements CanMatch, CanActivate {
  constructor(private authService: AuthenticationService) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    return this.hasRole(route);
  }

  /*
  canLoad(route: Route): Observable<boolean> {
    return this.hasRole(route);
  }
*/
  canMatch(route: Route): Observable<boolean> {
    return this.hasRole(route);
  }

  private hasRole(route: Route | ActivatedRouteSnapshot) {
    const allowedRoles = route.data?.['allowedRoles'];

    return this.authService.currentUsuario$.pipe(
      map((user) => Boolean(user && this.includesRoles(user.perfiles, allowedRoles))),
      tap((hasRole) => hasRole === false && alert('Acceso Denegado'))
    );
  }

  private  includesRoles(perfiles: Role[], allowedRoles: Role[]):boolean{
    var allawed = true;
    perfiles.forEach(function(value){
      allawed = allawed && allowedRoles.includes(value)
    });
    return allawed;
  }

}

function includesRole(perfiles: Role[],allowedRoles: Role[]) { 
  var allawed = true;
    perfiles.forEach(function(value){
      allawed = allawed && allowedRoles.includes(value)
    });
    return allawed; 
} 

// Only available for v14.2 and above****ver****allowedRoles.includes(user.perfiles[0])
export function hasRole(allowedRoles: Role[]) {
  return () =>
    inject(AuthenticationService).currentUsuario$.pipe(
      map((user) => Boolean(user && includesRole(user.perfiles, allowedRoles))),
      tap((hasRole) => hasRole === false && alert('Acceso Denegado'))
    );
}
