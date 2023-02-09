import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminComponent } from './admin/admin.component';
import { ManageRolesComponent } from './manage-roles/manage-roles.component';
import { ManageContactsComponent } from './manage-contacts/manage-contacts.component';
import { AdminRoutingModule } from './admin-routing.module';



@NgModule({
  declarations: [
    AdminDashboardComponent,
    AdminComponent,
    ManageRolesComponent,
    ManageContactsComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
