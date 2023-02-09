import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin/admin.component';
import { ComposeMessageComponent } from './compose-message/compose-message.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RolesComponent } from './roles/roles/roles.component';

const routes: Routes = [
  { path: 'compose', component: ComposeMessageComponent, outlet: 'popup' },
  { path: 'admin', component: AdminComponent },
  { path: 'roles', component: RolesComponent },
  { path: '', redirectTo: '/contacts', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
