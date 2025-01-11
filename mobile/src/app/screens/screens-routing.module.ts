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
        path: 'login',
        loadChildren: () =>
          import('./login/login.module').then((m) => m.LoginPageModule),
      },
      {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class ScreensPageRoutingModule {}
