import { RouterModule, Routes } from '@angular/router';

const appRoutes: Routes = [
  {
    path: '',
    data: { title: 'Dashboard' },
    loadChildren: () => import('./feature/pages/pages.module').then(m => m.PagesModule)
  }
];

export const APP_ROUTES = RouterModule.forRoot( appRoutes, { useHash: true} );
