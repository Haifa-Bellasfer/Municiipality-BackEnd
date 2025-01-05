import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddReclamationPageRoutingModule } from './add-reclamation-routing.module';

import { AddReclamationPage } from './add-reclamation.page';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddReclamationPageRoutingModule,
    RouterModule.forChild([{ path: '', component: AddReclamationPage }]),
  ],
  declarations: [AddReclamationPage],
})
export class AddReclamationPageModule {}
