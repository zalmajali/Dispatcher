import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TermsconditionsPageRoutingModule } from './termsconditions-routing.module';

import { TermsconditionsPage } from './termsconditions.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TermsconditionsPageRoutingModule
  ],
  declarations: [TermsconditionsPage]
})
export class TermsconditionsPageModule {}
