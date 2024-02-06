import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReclamationPage } from './reclamation.page';

const routes: Routes = [
  {
    path: '',
    component: ReclamationPage,
    children: [
      {
        path: 'add-reclamation',
        loadChildren: () =>
          import(
            './add-reclamation/add-reclamation/add-reclamation.module'
          ).then((m) => m.AddReclamationPageModule),
      },
      {
        path: 'list-reclamation',
        loadChildren: () =>
          import(
            './list-reclamation/list-reclamation/list-reclamation.module'
          ).then((m) => m.ListReclamationPageModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReclamationPageRoutingModule {}
