import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { CognitoService } from '@perx/open-services/dist/open-services';

@Component({
  selector: 'app-cognito-app',
  templateUrl: './cognito-app.component.html',
  styleUrls: ['./cognito-app.component.scss']
})
export class CognitoAppComponent implements OnInit, OnDestroy {
  private sub: any;
  app$: Observable<any>;
  appId: number;
  constructor(
    private cognitoService: CognitoService,
    private route: ActivatedRoute
  ) { }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      this.appId = params[`id`];
    });
    this.fetchUser();
  }
  private fetchUser(): void {
    this.app$ = this.cognitoService.fetchUser(this.appId);
  }
}
