import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './login/register.component';

const routes: Routes = [
  { path: 'login', data: { title: 'Login' }, component: LoginComponent },
  { path: 'register', data: { title: 'Register' }, component: RegisterComponent }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRegisterRoutingModule {}
