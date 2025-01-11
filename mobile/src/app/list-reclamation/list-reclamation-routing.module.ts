import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListReclamationPage } from './list-reclamation.page';

const routes: Routes = [
  {
    path: '',
    component: ListReclamationPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListReclamationPageRoutingModule {}
