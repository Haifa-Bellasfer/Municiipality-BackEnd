import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoginPage } from './login.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginPageRoutingModule } from './login-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    LoginPageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [LoginPage],
})
export class LoginPageModule {}
