import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {CampaignsComponent} from './campaigns.component';
import {NewCampaignComponent} from './new-campaign/new-campaign.component';


export const router: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: CampaignsComponent
      },
      {
        path: 'new-campaign',
        component: NewCampaignComponent
      }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(router)],
  exports: [RouterModule]
})
export class CampaignsRoutingModule {}
