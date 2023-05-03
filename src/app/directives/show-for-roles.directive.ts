import {
  Directive,
  Input,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { distinctUntilChanged, map, Subscription, tap } from 'rxjs';
import { AuthenticationService } from '../_services';
import { Role } from '../_models';
import { Usuario } from '../_models/usuario';

@Directive({
  selector: '[showForRoles]',
})
export class ShowForRolesDirective implements OnInit, OnDestroy {
  @Input('showForRoles') allowedRoles?: Role[];
  private sub?: Subscription;

  constructor(
    private authService: AuthenticationService,
    private viewContainerRef: ViewContainerRef,
    private templateRef: TemplateRef<any>
  ) {}
  ngOnInit(): void {
    this.sub = this.authService.currentUsuario$
      .pipe(
        map((user) => Boolean(user && this.includesRoles(user, this.allowedRoles))),
        distinctUntilChanged(),
        tap((hasRole) =>
          hasRole
            ? this.viewContainerRef.createEmbeddedView(this.templateRef)
            : this.viewContainerRef.clear()
        )
      )
      .subscribe();
  }

  //Si el usuario tiene al menos un rol dentro de los permitidos retorna verdadero.
  private  includesRoles(user: Usuario, allowedRoles?: Role[]):boolean{    
    return user.perfiles.some(function(value){
      return allowedRoles !== undefined && allowedRoles.includes(value)
    });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }
}
