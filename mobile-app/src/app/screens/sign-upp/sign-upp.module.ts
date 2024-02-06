import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SignUppPageRoutingModule } from './sign-upp-routing.module';

import { SignUppPage } from './sign-upp.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SignUppPageRoutingModule
  ],
  declarations: [SignUppPage]
})
export class SignUppPageModule {}
