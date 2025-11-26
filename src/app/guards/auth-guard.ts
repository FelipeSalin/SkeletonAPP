import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn:'root'
})
export class AuthGuard implements CanActivate {
  
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const sesionActiva = localStorage.getItem('usuarioActivo') === 'true';

    if (!sesionActiva) {
      this.router.navigate(['/login']); // redirige al login si no hay sesión
      return false;
    }

    return true; // permite el acceso
  }
};
