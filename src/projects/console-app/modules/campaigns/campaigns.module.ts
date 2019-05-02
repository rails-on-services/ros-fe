import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { OpenUiComponentsModule, ConfirmationModal, ManageColumnModal} from '@perx/open-ui-components';
import {CampaignsRoutingModule} from './campaigns-routing.module';
import {CampaignsComponent} from './campaigns.component';
import {SharedModule} from '../../../../shared/shared.module';

@NgModule({
  declarations: [
    CampaignsComponent
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    CampaignsRoutingModule,
    // routes,
    ReactiveFormsModule,
    FormsModule,
    OpenUiComponentsModule,
    SharedModule
  ],
  exports: [
    CampaignsComponent
  ],
  entryComponents: [
    ManageColumnModal,
    ConfirmationModal
  ]
})
export class CampaignsModule {
}
