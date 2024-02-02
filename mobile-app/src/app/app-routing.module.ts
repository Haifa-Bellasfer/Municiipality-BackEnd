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
    path: 'registration',
    loadChildren: () =>
      import('./screens/registration/registration.module').then(
        (m) => m.RegistrationPageModule
      ),
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
      import('./screens/sign-upp/sign-upp.module').then(
        (m) => m.SignUppPageModule
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
