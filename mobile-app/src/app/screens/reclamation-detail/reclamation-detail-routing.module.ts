import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReclamationDetailPage } from './reclamation-detail.page';

const routes: Routes = [
  {
    path: '',
    component: ReclamationDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReclamationDetailPageRoutingModule {}
