import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IamService, IamUser } from '@perx/open-services';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent implements OnInit, OnDestroy {
  id: number;
  action: string;
  private sub: any;
  users$: Observable<any[]>;
  tableHeaders: { key: string, value: string }[];
  selection: SelectionModel<IamUser>;

  constructor(
    private router: Router, 
    private route: ActivatedRoute,
    private iamService: IamService) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
      this.action = params['action'];
    });
    this.fetchUsers();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  private fetchUsers() {
    this.users$ = this.iamService.fetchUsers().pipe(
      map(document => {
        const iamUsers = document.getModels();
        const users = iamUsers.map(iamUser => {
          const user = { id: iamUser.id };
          const keys = Object.keys(iamUser.getColumnProperties());

          keys.forEach(key => {
            user[key] = iamUser[key];
          });

          return user;
        });

        return users;
      })
    );
  }

  get columnProperties() {
    return IamUser.prototype.getColumnProperties();
  }

  onUsersSelectionChange(selection: SelectionModel<IamUser>) {
    this.selection = selection;
  }

  cancelClicked() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
