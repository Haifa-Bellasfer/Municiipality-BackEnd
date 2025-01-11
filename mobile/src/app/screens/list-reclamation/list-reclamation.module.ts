import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ListReclamationPage } from './list-reclamation.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { ListReclamationPageRoutingModule } from './list-reclamation-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    ListReclamationPageRoutingModule,
  ],
  declarations: [ListReclamationPage],
})
export class ListReclamationPageModule {}
