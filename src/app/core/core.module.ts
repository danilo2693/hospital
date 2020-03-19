import { NgModule, ErrorHandler } from '@angular/core';

import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NopagefoundComponent } from './nopagefound/nopagefound.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { GlobalErrorHandlerService } from './services/global-error-handler.service';
import { LoaderComponent } from './loader/loader.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoaderInterceptorService } from './interceptor/loader-interceptor.service';

@NgModule({
  declarations: [BreadcrumbsComponent, HeaderComponent, SidebarComponent, NopagefoundComponent, LoaderComponent],
  providers: [
    [
      {
        provide: HTTP_INTERCEPTORS,
        useClass: LoaderInterceptorService,
        multi: true
      },
      {
        provide: ErrorHandler,
        useClass: GlobalErrorHandlerService
      }
    ]
  ],
  imports: [SharedModule, RouterModule],
  exports: [BreadcrumbsComponent, HeaderComponent, SidebarComponent, LoaderComponent],
  entryComponents: [LoaderComponent]
})
export class CoreModule {}
