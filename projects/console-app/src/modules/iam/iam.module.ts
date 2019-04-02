import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './pages/users/users.component';
import { GroupsComponent } from './pages/groups/groups.component';
import { HomeComponent } from './pages/home/home.component';
import {IamRoutingModule} from './iam-routing.module';
import { IamMenuComponent } from './components/iam-menu/iam-menu.component';
import {SharedModule} from '../../shared/shared.module';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [UsersComponent, GroupsComponent, HomeComponent, IamMenuComponent],
  imports: [
    CommonModule,
    IamRoutingModule,
    SharedModule,
    FormsModule,

  ],
  exports: [HomeComponent]
})
export class IamModule { }
