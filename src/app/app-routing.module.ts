import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RegisterComponent } from './register/register.component';
import { VarifyEmailComponent } from './varify-email/varify-email.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { AuthGuard } from './guard/auth.guard';
import { AdminComponent } from './components/admin/admin.component';
import { GuestComponent } from './components/guest/guest.component';
import { UserComponent } from './components/user/user.component';
import { ErroComponent } from './util/erro/erro.component';

const routes: Routes = [
  {path: '', redirectTo:'dashboard', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'dashboard', component: DashboardComponent, data: { roles: ["admin","user","guest"] }},
  {path: 'register', component: RegisterComponent},
  {path: 'verify-email', component: VarifyEmailComponent},
  {path: 'forgot-password', component: ForgotPasswordComponent},
  {path: 'error', component: ErroComponent},

  { path: "admin", component: AdminComponent, canActivate: [AuthGuard], data: { roles: ["admin"] } },
  { path: "user", component: UserComponent, canActivate: [AuthGuard], data: { roles: ["user"] } },
  { path: "guest", component: GuestComponent, canActivate: [AuthGuard], data: { roles: ["guest"] } },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
