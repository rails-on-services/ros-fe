import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { EventsComponent } from './pages/events/events.component';
import { EventComponent } from './pages/events/event/event.component';
import { CommsComponent } from './comms.component';
import { NewEventComponent } from './pages/events/new-event/new-event.component';
import { MessagesComponent } from './pages/messages/messages.component';
import { NewTemplateComponent } from './pages/templates/new-template/new-template.component';
import { TemplatesComponent } from './pages/templates/templates.component';
import { TemplateComponent } from './pages/templates/template/template.component';
import { CommsCampaignsComponent } from './pages/campaigns/comms-campaigns.component';
import { CommsCampaignComponent } from './pages/campaigns/comms-campaign/comms-campaign.component';
import { AttachTemplatesToCampaignComponent } from './pages/campaigns/attach-templates-to-campaign/attach-templates-to-campaign.component';
import { NewCampaignComponent } from './pages/campaigns/new-campaign/new-campaign.component';
import { NewProviderComponent } from './pages/providers/new-provider/new-provider.component';
import { CommsProvidersComponent } from './pages/providers/providers.component';
import { ProviderComponent } from './pages/providers/provider/provider.component';

export const router: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: '',
    component: CommsComponent,
    children: [
      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: 'events',
        component: EventsComponent,
        children: [
          // {
          //   path: 'new-user',
          //   component: ModalComponent,
          //   resolve: {
          //     modal: NewUserResolverService
          //   }
          // },
        ],
      },
      {
        path: 'events/new-event',
        component: NewEventComponent
      },
      {
        path: 'events/:id',
        component: EventComponent
      },
      {
        path: 'messages',
        component: MessagesComponent,
      },
      {
        path: 'templates',
        component: TemplatesComponent,
      },
      {
        path: 'templates/new-template',
        component: NewTemplateComponent
      },
      {
        path: 'templates/:id',
        component: TemplateComponent
      },
      {
        path: 'campaigns',
        component: CommsCampaignsComponent,
      },
      {
        path: 'campaigns/new-campaign',
        component: NewCampaignComponent
      },
      {
        path: 'campaigns/:id',
        component: CommsCampaignComponent,
      },
      {
        path: 'campaigns/:id/attach-templates',
        component: AttachTemplatesToCampaignComponent
      },
      {
        path: 'providers',
        component: CommsProvidersComponent,
      },
      {
        path: 'providers/new-provider',
        component: NewProviderComponent
      },
      {
        path: 'providers/:id',
        component: ProviderComponent
      },
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(router)],
  exports: [RouterModule]
})
export class CommsRoutingModule {
}
