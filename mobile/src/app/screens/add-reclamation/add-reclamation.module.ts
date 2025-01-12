import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddReclamationPage } from './add-reclamation.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { AddReclamationPageRoutingModule } from './add-reclamation-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    AddReclamationPageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [AddReclamationPage],
})
export class AddReclamationPageModule {}
