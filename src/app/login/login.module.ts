import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginPageRoutingModule } from './login-routing.module';

import { LoginPage } from './login.page';
import {ForgetpasswordComponent} from "../forgetpassword/forgetpassword.component";
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginPageRoutingModule
  ],
  declarations: [LoginPage,ForgetpasswordComponent],
  entryComponents:[ForgetpasswordComponent]
})
export class LoginPageModule {}
