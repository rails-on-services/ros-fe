import {NgModule} from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { OpenUiComponentsModule, ConfirmationModal, ManageColumnModal } from '@perx/open-ui-components';
import {CampaignsRoutingModule} from './campaigns-routing.module';
import {CampaignsComponent} from './campaigns.component';
import {NewCampaignComponent} from './new-campaign/new-campaign.component';

import {SharedModule} from '../../../../shared/shared.module';

const COMPONENTS = [
  CampaignsComponent,
  NewCampaignComponent
];

@NgModule({
  declarations: [
    ...COMPONENTS
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    CampaignsRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    OpenUiComponentsModule,
    SharedModule
  ],
  exports: [
    ...COMPONENTS
  ]
})
export class CampaignsModule {
}
