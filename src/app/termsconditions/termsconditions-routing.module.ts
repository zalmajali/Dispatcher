import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TermsconditionsPage } from './termsconditions.page';

const routes: Routes = [
  {
    path: '',
    component: TermsconditionsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TermsconditionsPageRoutingModule {}
