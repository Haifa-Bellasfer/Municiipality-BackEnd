import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SignUpPage } from './sign-up.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';
import { SignUpPageRoutingModule } from './sign-up-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    SignUpPageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [SignUpPage],
})
export class SignUpPageModule {}
