import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {CampaignsComponent} from './campaigns.component';

const router: Routes = [
  {
    path: '',
    component: CampaignsComponent
  },

];

@NgModule({
  imports: [RouterModule.forChild(router)],
  exports: [RouterModule]
})
export class CampaignsRoutingModule {
}
