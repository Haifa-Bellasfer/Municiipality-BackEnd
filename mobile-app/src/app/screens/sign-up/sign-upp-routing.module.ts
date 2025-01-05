import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SignUppPage } from './sign-upp.page';

const routes: Routes = [
  {
    path: '',
    component: SignUppPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SignUppPageRoutingModule {}
