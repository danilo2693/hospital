import { RouterModule, Routes } from '@angular/router';
import { NopagefoundComponent } from './core/nopagefound/nopagefound.component';

const appRoutes: Routes = [
  {
    path: '',
    loadChildren: () => import('./feature/pages/pages.module').then(m => m.PagesModule)
  },
  {
    path: '',
    loadChildren: () => import('./feature/login-register/login-register.module').then(m => m.LoginRegisterModule)
  },
  { path: '', pathMatch: 'full', redirectTo: '/dashboard' },
  { path: '**', component: NopagefoundComponent }
];

export const APP_ROUTES = RouterModule.forRoot(appRoutes, { useHash: true });
