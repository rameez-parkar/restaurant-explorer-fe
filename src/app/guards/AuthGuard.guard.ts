import { CanActivateFn } from '@angular/router';

export const AuthGuard: CanActivateFn = (route, state) => {
  if (sessionStorage.getItem('token') &&
  sessionStorage.getItem('email')) {
      return true;
  }
  return false;
};