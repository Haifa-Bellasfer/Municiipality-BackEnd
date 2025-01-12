import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReclamationDetailPageRoutingModule } from './reclamation-detail-routing.module';

import { ReclamationDetailPage } from './reclamation-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReclamationDetailPageRoutingModule,
  ],
  declarations: [ReclamationDetailPage],
})
export class ReclamationDetailPageModule {}
