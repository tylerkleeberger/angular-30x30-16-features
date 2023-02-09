import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { DialogService } from 'src/app/dialog.service';
import { Role } from '../role';

@Component({
  selector: 'app-role-detail',
  templateUrl: './role-detail.component.html',
  styleUrls: ['./role-detail.component.scss']
})
export class RoleDetailComponent implements OnInit{
  role!: Role;
  editName = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dialogService: DialogService
  ) { }

   ngOnInit(): void {
     this.route.data
     .subscribe(data => {
       const role: Role = data['role'];
       this.editName = role.name;
       this.role = role;
     });
   }

   cancel() {
    this.gotoRole();
  }

  save() {
    this.role.name = this.editName;
    this.gotoRole();
  }

  canDeactivate(): Observable<boolean> | boolean {
    // Allow synchronous navigation (`true`) if no crisis or the crisis is unchanged
    if (!this.role || this.role.name === this.editName) {
      return true;
    }
    // Otherwise ask the user with the dialog service and return its
    // observable which resolves to true or false when the user decides
    return this.dialogService.confirm('Discard changes?');
  }

  gotoRole() {
    const roleId = this.role ? this.role.id : null;
    this.router.navigate(['../', {id: roleId }], {relativeTo: this.route });
  }

}
