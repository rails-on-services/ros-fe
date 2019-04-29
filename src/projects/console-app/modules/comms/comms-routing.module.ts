import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { EventsComponent } from './pages/events/events.component';
import { CommsComponent } from './comms.component';
import { NewEventComponent } from './pages/events/new-event/new-event.component';
import { MessagesComponent } from './pages/messages/messages.component';
import { NewMessageComponent } from './pages/messages/new-message/new-message.component';
import { NewTemplateComponent } from './pages/templates/new-template/new-template.component';
import { TemplatesComponent } from './pages/templates/templates.component';

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
        path: 'events/new-events',
        component: NewEventComponent
      },
      {
        path: 'messages',
        component: MessagesComponent,
      },
      {
        path: 'messages/new-message',
        component: NewMessageComponent
      },
      {
        path: 'templates',
        component: TemplatesComponent,
      },
      {
        path: 'templates/new-templates',
        component: NewTemplateComponent
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
