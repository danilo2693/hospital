import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './login/register.component';
import { RecoveryPasswordComponent } from './recovery-password/recovery-password.component';

const routes: Routes = [
  { path: 'login', data: { title: 'Login' }, component: LoginComponent },
  { path: 'register', data: { title: 'Register' }, component: RegisterComponent },
  { path: 'recovery-password', data: { title: 'RecoveryPassword' }, component: RecoveryPasswordComponent },
  { path: 'recovery-password/:resetToken', data: { title: 'RecoveryPassword' }, component: RecoveryPasswordComponent }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRegisterRoutingModule {}
