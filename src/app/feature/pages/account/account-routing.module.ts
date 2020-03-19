import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  { path: 'account-settings', component: AccountSettingsComponent, data: { title: 'Settings' } },
  { path: 'profile', component: ProfileComponent, data: { title: 'Profile' } }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule {}
