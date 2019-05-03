import { CognitoService } from '@perx/open-services';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators'

@Component({
  selector: 'app-cognito-home',
  templateUrl: './cognito-home.component.html',
  styleUrls: ['./cognito-home.component.scss']
})
export class CognitoHomeComponent implements OnInit {
  usersCount: number;
  groupsCount: number;
  appsCount: number;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private cognitoService: CognitoService
  ) {}

  ngOnInit() {
    this.fetchUsers();
    this.fetchGroups();
    // this.fetchApps();
  }

  fetchUsers() {
    this.cognitoService.fetchUsers().pipe(
      map(data => {
        const cognitoUsers = data.getModels();

        return cognitoUsers;
      })
    ).subscribe(
      response => {
        this.usersCount = response.length;
      }
    );
  }

  fetchGroups() {
    this.cognitoService.fetchGroups().pipe(
      map(data => {
        const cognitoGroups = data.getModels();

        return cognitoGroups;
      })
    ).subscribe(
      response => {
        this.groupsCount = response.length;
      }
    );
  }

  fetchApps() {
    // this.cognitoService.fetchApps().pipe(
    //   map(data => {
    //     const cognitoApps = data.getModels();

    //     return cognitoApps;
    //   })
    // ).subscribe(
    //   response => {
    //     this.appsCount = response.length;
    //   }
    // );
  }
}