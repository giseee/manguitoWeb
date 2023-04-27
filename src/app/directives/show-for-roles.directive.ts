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

  private  includesRoles(user: Usuario, allowedRoles?: Role[]):boolean{
    var allawed = true;
    user.perfiles.forEach(function(value){
      allawed = allawed && allowedRoles !== undefined && allowedRoles.includes(value)
    });
    return allawed;
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }
}
