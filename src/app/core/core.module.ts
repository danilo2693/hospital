import { NgModule, ErrorHandler } from '@angular/core';

import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NopagefoundComponent } from './nopagefound/nopagefound.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { GlobalErrorHandlerService } from './services/global-error-handler.service';

@NgModule({
  declarations: [BreadcrumbsComponent, HeaderComponent, SidebarComponent, NopagefoundComponent],
  providers: [
    {
      provide: ErrorHandler,
      useClass: GlobalErrorHandlerService
    }
  ],
  imports: [SharedModule, RouterModule],
  exports: [BreadcrumbsComponent, HeaderComponent, SidebarComponent]
})
export class CoreModule {}
