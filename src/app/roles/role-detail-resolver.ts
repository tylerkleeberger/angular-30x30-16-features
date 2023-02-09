import {inject} from '@angular/core';
import {ActivatedRouteSnapshot, ResolveFn, Router} from '@angular/router';
import {EMPTY, of} from 'rxjs';
import {mergeMap} from 'rxjs/operators';
import { Role } from './role';
import { RolesService } from './roles.service';



export const roleDetailResolver: ResolveFn<Role> = (route: ActivatedRouteSnapshot) => {
  const router = inject(Router);
  const cs = inject(RolesService);
  const id = route.paramMap.get('id')!;

  return cs.getRole(id).pipe(mergeMap(role => {
    if (role) {
      return of(role);
    } else {  // id not found
      router.navigate(['/role-center']);
      return EMPTY;
    }
  }));
};
