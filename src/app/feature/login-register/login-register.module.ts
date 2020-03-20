import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginRegisterRoutingModule } from './login-register-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './login/register.component';
import { RecoveryPasswordComponent } from './recovery-password/recovery-password.component';

@NgModule({
  declarations: [LoginComponent, RegisterComponent, RecoveryPasswordComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, LoginRegisterRoutingModule, TranslateModule],
  exports: [CommonModule, FormsModule, ReactiveFormsModule, TranslateModule]
})
export class LoginRegisterModule {}
