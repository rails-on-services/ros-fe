import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { DashboardMenuComponent } from './components/dashboard-menu/dashboard-menu.component';
import { SummaryComponent } from './pages/summary/summary.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { SharedModule } from '../../../../shared/shared.module';
import { OpenUiComponentsModule } from '@perx/open-ui-components';

@NgModule({
  declarations: [
    DashboardComponent,
    DashboardMenuComponent,
    SummaryComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
    OpenUiComponentsModule
  ]
})
export class DashboardModule {
}
