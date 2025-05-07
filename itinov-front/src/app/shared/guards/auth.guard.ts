import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";

export function authenticationGuard(): CanActivateFn {
  return () => {
    const router: Router = inject(Router);
    const token = localStorage?.getItem("token");
    return !!token || router.createUrlTree(['/login']);
  };
}