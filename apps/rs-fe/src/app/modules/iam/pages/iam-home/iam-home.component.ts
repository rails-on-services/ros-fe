import { Component, OnInit } from '@angular/core';
import { IamService } from '@perx/open-services/dist/open-services';

@Component({
  selector: 'app-iam-home',
  templateUrl: './iam-home.component.html',
  styleUrls: ['./iam-home.component.scss']
})
export class IamHomeComponent implements OnInit {
  usersCount: number;
  groupsCount: number;
  policiesCount: number;

  constructor(
    private iamService: IamService
  ) {
    this.usersCount = 0;
    this.groupsCount = 0;
    this.policiesCount = 0;
  }

  ngOnInit(): void {
    this.fetchUsers();
    this.fetchGroups();
    this.fetchPolicies();
  }

  fetchUsers(): void {
    this.iamService.fetchUsers().subscribe(
      response => {
        this.usersCount = response.length;
      }
    );
  }

  fetchGroups(): void {
    this.iamService.fetchGroups().subscribe(
      response => {
        this.groupsCount = response.length;
      }
    );
  }

  fetchPolicies(): void {
    this.iamService.fetchPolicies().subscribe(
      response => {
        this.policiesCount = response.length;
      }
    );
  }
}
