import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { CognitoService, CognitoPool } from '@perx/open-services';
import { Router, ActivatedRoute } from '@angular/router';
import { SelectionModel } from '@angular/cdk/collections';
import { map, switchMap } from 'rxjs/operators';
import { CognitoPoolsComponent } from '../../cognito-pools/cognito-pools.component';

@Component({
  selector: 'app-cognito-user',
  templateUrl: './cognito-user.component.html',
  styleUrls: ['./cognito-user.component.scss']
})
export class CognitoUserComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['groupName', 'remove'];

  @ViewChild(CognitoPoolsComponent) cognitoPoolsComponent: CognitoPoolsComponent;
  private sub: any;
  user$: Observable<any>;
  userId: number;

  constructor(
    private cognitoService: CognitoService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.userId = params[`id`];
    });
    this.fetchUser();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  detachPoolsFromUser(selection: SelectionModel<CognitoPool>) {
    const selectedPools = selection.selected.map(item => item.id);
    this.cognitoService.fetchUser(this.userId).pipe(
      map(user => {
        user.groups = user.groups.filter(item => !selectedPools.includes(item.id));
        return user;
      }),
      switchMap(user => user.save())
    ).subscribe(
      () => {
        this.cognitoPoolsComponent.clearSelection();
        this.cognitoPoolsComponent.fetchPools(true);
      }
    );
  }

  attachPoolsToUser() {
    this.router.navigate(['attach-groups'], { relativeTo: this.route });
  }

  private fetchUser() {
    this.user$ = this.cognitoService.fetchUser(this.userId);
  }
}
