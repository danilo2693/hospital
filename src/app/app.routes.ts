import { RouterModule, Routes } from '@angular/router';

import { NopagefoundComponent } from './core/nopagefound/nopagefound.component';

const appRoutes: Routes = [
  {
    path: '',
    data: { title: 'Dashboard' },
    loadChildren: () => import('./feature/pages/pages.module').then(m => m.PagesModule)
  }
];

export const APP_ROUTES = RouterModule.forRoot( appRoutes, { useHash: true} );
