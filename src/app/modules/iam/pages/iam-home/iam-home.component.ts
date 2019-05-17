import { Component, OnInit } from '@angular/core';
import { IamService } from '@perx/open-services';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';

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
    private router: Router,
    private route: ActivatedRoute,
    private iamService: IamService
  ) {
    this.usersCount = 0;
    this.groupsCount = 0;
    this.policiesCount = 0;
  }

  ngOnInit() {
    this.fetchUsers();
    this.fetchGroups();
    this.fetchPolicies();
  }

  fetchUsers() {
    this.iamService.fetchUsers().subscribe(
      response => {
        this.usersCount = response.length;
      }
    );
  }

  fetchGroups() {
    this.iamService.fetchGroups().subscribe(
      response => {
        this.groupsCount = response.length;
      }
    );
  }

  fetchPolicies() {
    this.iamService.fetchPolicies().subscribe(
      response => {
        this.policiesCount = response.length;
      }
    );
  }
}
