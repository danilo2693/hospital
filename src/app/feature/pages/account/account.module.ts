import { NgModule } from '@angular/core';
import { AccountRoutingModule } from './account-routing.module';
import { SharedModule } from '../../../shared/shared.module';
import { CoreModule } from '../../../core/core.module';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { ProfileComponent } from './profile/profile.component';

@NgModule({
  declarations: [AccountSettingsComponent, ProfileComponent],
  imports: [AccountRoutingModule, SharedModule, CoreModule]
})
export class AccountModule {}
