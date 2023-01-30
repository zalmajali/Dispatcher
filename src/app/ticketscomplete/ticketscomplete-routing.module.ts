import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TicketscompletePage } from './ticketscomplete.page';

const routes: Routes = [
  {
    path: '',
    component: TicketscompletePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TicketscompletePageRoutingModule {}
