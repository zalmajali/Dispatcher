import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TaskPageRoutingModule } from './task-routing.module';

import { TaskPage } from './task.page';
import {SignatureComponent} from "../signature/signature.component";
import {TicketactionComponent} from "../ticketaction/ticketaction.component";
import {TicketattachmentComponent} from "../ticketattachment/ticketattachment.component";
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TaskPageRoutingModule
  ],
  declarations: [TaskPage,SignatureComponent,TicketactionComponent,TicketattachmentComponent],
  entryComponents:[SignatureComponent,TicketactionComponent,TicketattachmentComponent]
})
export class TaskPageModule {}
