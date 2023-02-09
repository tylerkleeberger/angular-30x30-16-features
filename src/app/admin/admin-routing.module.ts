import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "../auth/auth.guard";
import { AdminDashboardComponent } from "./admin-dashboard/admin-dashboard.component";
import { AdminComponent } from "./admin/admin.component";
import { ManageContactsComponent } from "./manage-contacts/manage-contacts.component";
import { ManageRolesComponent } from "./manage-roles/manage-roles.component";

const adminRoutes: Routes = [
    {
      path: 'admin',
      component: AdminComponent,
      canActivate: [AuthGuard],
      children: [
        {
          path: '', canActivate: [AuthGuard],
          children: [
            { path: 'roles', component: ManageRolesComponent },
            { path: 'contacts', component: ManageContactsComponent },
            { path: '', component: AdminDashboardComponent }
          ]
        }
      ]
    }
  ];
  
  @NgModule({
    imports: [
      RouterModule.forChild(adminRoutes)
    ],
    exports: [
      RouterModule
    ]
  })
  export class AdminRoutingModule {}