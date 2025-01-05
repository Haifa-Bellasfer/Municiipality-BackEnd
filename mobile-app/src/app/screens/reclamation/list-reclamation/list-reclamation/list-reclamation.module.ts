import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListReclamationPageRoutingModule } from './list-reclamation-routing.module';

import { ListReclamationPage } from './list-reclamation.page';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListReclamationPageRoutingModule,
    RouterModule.forChild([{ path: '', component: ListReclamationPage }]),
  ],
  declarations: [ListReclamationPage],
})
export class ListReclamationPageModule {}
