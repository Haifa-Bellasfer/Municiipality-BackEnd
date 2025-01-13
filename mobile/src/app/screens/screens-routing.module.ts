import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ScreensPage } from './screens.page';

const routes: Routes = [
  {
    path: '',
    component: ScreensPage,
    children: [
      {
        path: 'add-reclamation',
        loadChildren: () =>
          import('./add-reclamation/add-reclamation.module').then(
            (m) => m.AddReclamationPageModule
          ),
      },
      {
        path: 'list-reclamation',
        loadChildren: () =>
          import('./list-reclamation/list-reclamation.module').then(
            (m) => m.ListReclamationPageModule
          ),
      },
      {
        path: 'reclamation-detail/:id',
        loadChildren: () =>
          import('./reclamation-detail/reclamation-detail.module').then(
            (m) => m.ReclamationDetailPageModule
          ),
      },
    ],
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./login/login.module').then((m) => m.LoginPageModule),
  },
  {
    path: 'signup',
    loadChildren: () =>
      import('./sign-up/sign-up.module').then((m) => m.SignUpPageModule),
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./home/home.module').then((m) => m.HomePageModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class ScreensPageRoutingModule {}
