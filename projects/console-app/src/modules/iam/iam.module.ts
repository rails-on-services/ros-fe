import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './pages/users/users.component';
import { GroupsComponent } from './pages/groups/groups.component';
import { HomeComponent } from './pages/home/home.component';
import {IamRoutingModule} from './iam-routing.module';

@NgModule({
  declarations: [UsersComponent, GroupsComponent, HomeComponent],
  imports: [
    CommonModule,
    IamRoutingModule,
  ]
})
export class IamModule { }
