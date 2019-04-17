import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CognitoComponent } from './cognito.component';
import { CognitoRoutingModule } from './cognito-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { UsersComponent } from './pages/users/users.component';
import { GroupsComponent } from './pages/groups/groups.component';
import { CognitoMenuComponent } from './components/cognito-menu/cognito-menu.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DismissableContentComponent } from '../../../../../shared/components/dismissable-content/dismissable-content.component';
import { NewUserComponent } from './pages/users/new-user/new-user.component';
import { SharedModule } from '../../../../../shared/shared.module';

@NgModule({
  declarations: [
    CognitoComponent,
    HomeComponent,
    UsersComponent,
    GroupsComponent,
    CognitoMenuComponent,
    NewUserComponent
  ],
  imports: [
    CommonModule,
    CognitoRoutingModule,
    FlexLayoutModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  entryComponents: [
    DismissableContentComponent,
    NewUserComponent]
})
export class CognitoModule { }
