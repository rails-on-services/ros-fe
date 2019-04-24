import { Component, OnInit } from '@angular/core';
import { MatButtonToggleChange, MatDialog } from '@angular/material';
import { IamService, IamUser } from '@perx/open-services';
import { SelectionModel } from '@angular/cdk/collections';
import { Observable } from 'rxjs';
import { JsonApiQueryData } from 'angular2-jsonapi';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-policy-attach',
  templateUrl: './policy-attach.component.html',
  styleUrls: ['./policy-attach.component.scss']
})
export class PolicyAttachComponent implements OnInit {
  users$: Observable<any[]>;

  selection: SelectionModel<IamUser>;

  shownColumns$: Observable<(string|number|symbol)[]>;
  shownColumns: (string|number|symbol)[];

  constructor(
    private iamService: IamService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.shownColumns = ['username', 'type'];
    this.fetchUsers();
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
    return { type: {value: 'users', sortable: true}, ...IamUser.prototype.getColumnProperties()};
  }

  onUsersSelectionChange(selection: SelectionModel<IamUser>) {
    this.selection = selection;
  }

}
