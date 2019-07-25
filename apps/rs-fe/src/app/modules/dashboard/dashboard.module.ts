import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { SummaryComponent } from './pages/summary/summary.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { SharedModule } from '../../../shared/shared.module';
import { OpenUiComponentsModule } from '@perx/open-ui-components';
import { ServiceMenuModule } from 'src/app/core/components/service-menu/service-menu.module';

const COMPONENTS = [
  DashboardComponent,
  SummaryComponent
];

@NgModule({
  declarations: [
    ...COMPONENTS
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
    OpenUiComponentsModule,
    ServiceMenuModule
  ],
  exports: [
    ...COMPONENTS,
    DashboardRoutingModule
  ]
})
export class DashboardModule {
}
