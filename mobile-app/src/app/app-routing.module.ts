import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () =>
      import('./home/home.module').then((m) => m.HomePageModule),
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./screens/login/login.module').then((m) => m.LoginPageModule),
  },
  {
    path: 'reclamation',
    loadChildren: () =>
      import('./screens/reclamation/reclamation.module').then(
        (m) => m.ReclamationPageModule
      ),
  },
  {
    path: 'sign-up',
    loadChildren: () =>
      import('./screens/sign-up/sign-upp.module').then(
        (m) => m.SignUppPageModule
      ),
  },
  {
    path: 'reclamation-detail',
    loadChildren: () =>
      import('./screens/reclamation-detail/reclamation-detail.module').then(
        (m) => m.ReclamationDetailPageModule
      ),
  },
  {
    path: 'reclamation-detail/:id',
    loadChildren: () =>
      import('./screens/reclamation-detail/reclamation-detail.module').then(
        (m) => m.ReclamationDetailPageModule
      ),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
