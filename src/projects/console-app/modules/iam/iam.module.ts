import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UsersComponent} from './pages/users/users.component';
import {GroupsComponent} from './pages/groups/groups.component';
import {HomeComponent} from './pages/home/home.component';
import {IamRoutingModule} from './iam-routing.module';
import {IamMenuComponent} from './components/iam-menu/iam-menu.component';
import {SharedModule} from '../../../../shared/shared.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {IamComponent} from './iam.component';
import {NewUserComponent} from './pages/users/new-user/new-user.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NewGroupComponent } from './pages/groups/new-group/new-group.component';
import { OpenUiComponentsModule , ConfirmationModal, ManageColumnModal} from '@perx/open-ui-components';

// import {routes} from './iam-routing.module';

@NgModule({
  declarations: [UsersComponent,
    GroupsComponent,
    HomeComponent,
    IamMenuComponent,
    IamComponent,
    NewUserComponent,
    NewGroupComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    IamRoutingModule,
    // routes,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    OpenUiComponentsModule
  ],
  exports: [HomeComponent, IamComponent],
  entryComponents: [
    ManageColumnModal,
    ConfirmationModal,
    NewUserComponent]
})
export class IamModule {
}
