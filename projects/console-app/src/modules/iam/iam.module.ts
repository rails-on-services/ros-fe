import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './pages/users/users.component';
import { GroupsComponent } from './pages/groups/groups.component';
import { HomeComponent } from './pages/home/home.component';
import {IamRoutingModule} from './iam-routing.module';
import { IamMenuComponent } from './components/iam-menu/iam-menu.component';

@NgModule({
  declarations: [UsersComponent, GroupsComponent, HomeComponent, IamMenuComponent],
  imports: [
    CommonModule,
    IamRoutingModule,
  ]
})
export class IamModule { }
