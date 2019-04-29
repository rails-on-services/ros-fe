import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { OpenUiComponentsModule , ConfirmationModal, ManageColumnModal} from '@perx/open-ui-components';
import {HomeComponent} from './pages/home/home.component';
import {CommsRoutingModule} from './comms-routing.module';
import {CommsMenuComponent} from './components/comms-menu/comms-menu.component';
import {CommsComponent} from './comms.component';
import {SharedModule} from '../../../../shared/shared.module';
import { NewEventComponent } from './pages/events/new-event/new-event.component';
import { NewMessageComponent } from './pages/messages/new-message/new-message.component';
import { NewTemplateComponent } from './pages/templates/new-template/new-template.component';
import { EventsComponent } from './pages/events/events.component';
import { MessagesComponent } from './pages/messages/messages.component';
import { TemplatesComponent } from './pages/templates/templates.component';

// import {routes} from './comms-routing.module';

@NgModule({
  declarations: [EventsComponent,
    MessagesComponent,
    TemplatesComponent,
    NewEventComponent,
    NewMessageComponent,
    NewTemplateComponent,
    HomeComponent,
    CommsMenuComponent,
    CommsComponent,
    ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    CommsRoutingModule,
    // routes,
    ReactiveFormsModule,
    FormsModule,
    OpenUiComponentsModule,
    SharedModule
  ],
  exports: [HomeComponent, CommsComponent],
  entryComponents: [
    ManageColumnModal,
    ConfirmationModal,
    NewEventComponent,
  NewMessageComponent,
  NewTemplateComponent]
})
export class CommsModule {
}
