import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { canDeactivateGuard } from "../can-deactivate.guard";
import { HomeComponent } from "./home/home.component";
import { roleDetailResolver } from "./role-detail-resolver";
import { RoleDetailComponent } from "./role-detail/role-detail.component";
import { RoleListComponent } from "./role-list/role-list.component";
import { RolesComponent } from "./roles/roles.component";


const rolesRoutes: Routes = [
    { path: 'roles', component: RolesComponent,
        children: [
            { path: '', component: RoleListComponent,
                children: [
                    { path: ':id', component: RoleDetailComponent, canDeactivate: [canDeactivateGuard], 
                        resolve: { role: roleDetailResolver} },
                    { path: '', component: HomeComponent }
                ]}
        ]}
];

@NgModule({
    imports: [
        RouterModule.forChild(rolesRoutes)
    ],
    exports: [
        RouterModule
    ]
})

export class RolesRoutingModule { }