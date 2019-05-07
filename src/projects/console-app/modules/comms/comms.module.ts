import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { OpenUiComponentsModule, ConfirmationModal, ManageColumnModal } from '@perx/open-ui-components';
import { HomeComponent } from './pages/home/home.component';
import { CommsRoutingModule } from './comms-routing.module';
import { CommsMenuComponent } from './components/comms-menu/comms-menu.component';
import { CommsComponent } from './comms.component';
import { SharedModule } from '../../../../shared/shared.module';
import { NewEventComponent } from './pages/events/new-event/new-event.component';
import { NewTemplateComponent } from './pages/templates/new-template/new-template.component';
import { EventsComponent } from './pages/events/events.component';
import { MessagesComponent } from './pages/messages/messages.component';
import { TemplatesComponent } from './pages/templates/templates.component';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { NewCampaignComponent } from './pages/campaigns/new-campaign/new-campaign.component';
import { CommsCampaignsComponent } from './pages/campaigns/comms-campaigns.component';
import { CommsProvidersComponent } from './pages/providers/providers.component';
import { NewProviderComponent } from './pages/providers/new-provider/new-provider.component';
import { CommsCampaignComponent } from './pages/campaigns/comms-campaign/comms-campaign.component';
import { AttachEventsToCampaignComponent } from './pages/campaigns/attach-events-to-campaign/attach-events-to-campaign.component';
import { EventComponent } from './pages/events/event/event.component';
import { TemplateComponent } from './pages/templates/template/template.component';
import { ProviderComponent } from './pages/providers/provider/provider.component';

// import {routes} from './comms-routing.module';

@NgModule({
  declarations: [
    EventsComponent,
    MessagesComponent,
    TemplatesComponent,
    CommsProvidersComponent,
    CommsCampaignsComponent,
    NewEventComponent,
    NewTemplateComponent,
    NewCampaignComponent,
    NewProviderComponent,
    HomeComponent,
    CommsMenuComponent,
    CommsComponent,
    CommsCampaignComponent,
    AttachEventsToCampaignComponent,
    EventComponent,
    TemplateComponent,
    ProviderComponent,
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    CommsRoutingModule,
    // routes,
    ReactiveFormsModule,
    FormsModule,
    OpenUiComponentsModule,
    NgxMaterialTimepickerModule,
    SharedModule
  ],
  exports: [HomeComponent, CommsComponent],
  entryComponents: [
    ManageColumnModal,
    ConfirmationModal,
    NewEventComponent,
    NewTemplateComponent,
    NewProviderComponent,
    NewCampaignComponent]
})
export class CommsModule {
}
