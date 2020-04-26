import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuthComponent} from "./shared/components/auth/auth.component";
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {AuthGuard} from "./shared/guards/auth.guard";
import {MainViewComponent} from "./main-view/main-view.component";


const routes: Routes = [
  {
    path: '', component: AuthComponent, children: [
      {path: '', redirectTo: '/login', pathMatch: 'full'},
      {path: 'login', component: LoginComponent},
      {path: 'register', component: RegisterComponent}
    ]
  },
  {
    path: '', component: MainViewComponent, canActivate: [AuthGuard], children: [
      // TODO implement OverviewComponent
      // {path: 'overview', component: OverviewComponent},

    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
