import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RolesComponent } from './roles.component';
import { RoleListComponent } from '../role-list/role-list.component';
import { RoleDetailComponent } from '../role-detail/role-detail.component';
import { HomeComponent } from '../home/home.component';
import { FormsModule } from '@angular/forms';
import { RolesRoutingModule } from '../roles-routing.module';



@NgModule({
  declarations: [
    RolesComponent,
    RoleListComponent,
    RoleDetailComponent,
    HomeComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    RolesRoutingModule,
  ]
})
export class RolesModule { }
