import { CognitoService } from '@perx/open-services/dist/open-services';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cognito-home',
  templateUrl: './cognito-home.component.html',
  styleUrls: ['./cognito-home.component.scss']
})
export class CognitoHomeComponent implements OnInit {
  usersCount: number;
  poolsCount: number;
  appsCount: number;

  constructor(
    private cognitoService: CognitoService
  ) {
    this.usersCount = 0;
    this.poolsCount = 0;
    this.appsCount = 0;
  }

  ngOnInit(): void {
    this.fetchUsers();
    // this.fetchGroups();
    // this.fetchApps();
  }

  fetchUsers(): void {
    this.cognitoService.fetchUsers().subscribe(
      response => {
        this.usersCount = response.length;
      }
    );
  }


  fetchGroups(): void {
    // this.cognitoService.fetchGroups().pipe(
    //   map(data => {
    //     const cognitoPools = data.getModels();

    //     return cognitoPools;
    //   })
    // ).subscribe(
    //   response => {
    //     this.poolsCount = response.length;
    //   }
    // );
  }

  fetchApps(): void {
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
