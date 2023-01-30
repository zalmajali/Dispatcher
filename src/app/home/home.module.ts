import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import {TicketactionComponent} from "../ticketaction/ticketaction.component";
import {TicketattachmentComponent} from "../ticketattachment/ticketattachment.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule
  ],
  declarations: [HomePage,TicketactionComponent,TicketattachmentComponent],
  entryComponents:[TicketactionComponent,TicketattachmentComponent]
})
export class HomePageModule {}
