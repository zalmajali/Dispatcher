import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TicketscompletePageRoutingModule } from './ticketscomplete-routing.module';

import { TicketscompletePage } from './ticketscomplete.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TicketscompletePageRoutingModule
  ],
  declarations: [TicketscompletePage]
})
export class TicketscompletePageModule {}
