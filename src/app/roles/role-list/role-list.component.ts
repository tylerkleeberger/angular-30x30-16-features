import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Role } from '../role';
import { RolesService } from '../roles.service';

@Component({
  selector: 'app-role-list',
  templateUrl: './role-list.component.html',
  styleUrls: ['./role-list.component.scss']
})
export class RoleListComponent implements OnInit {
  roles$?: Observable<Role[]>;
  selectedId = 0;

  constructor(
    private roleService: RolesService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.roles$ = this.route.firstChild?.paramMap.pipe(
      switchMap(params => {
        this.selectedId = parseInt(params.get('id')!, 10);
        return this.roleService.getRoles();
      })
    );
  }
}