import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { IamUsersComponent } from '../../iam-users/iam-users.component';
import { Observable } from 'rxjs';
import { SelectionModel } from '@angular/cdk/collections';
import { IamService, IamGroup } from '@perx/open-services';
import { Router, ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-iam-group',
  templateUrl: './iam-group.component.html',
  styleUrls: ['./iam-group.component.scss']
})
export class IamGroupComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['groupName', 'remove'];

  @ViewChild(IamUsersComponent) iamGroupsComponent: IamUsersComponent;
  private sub: any;
  group$: Observable<any>;
  groupId: number;

  constructor(
    private iamService: IamService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.groupId = params[`id`];
    });
    this.fetchGroup();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  detachGroupsFromUser(selection: SelectionModel<IamGroup>) {
    const selectedUsers = selection.selected.map(item => item.id);
    this.iamService.fetchGroup(this.groupId).pipe(
      map(group => {
        group.users = group.users.filter(item => !selectedUsers.includes(item.id));
        return group;
      }),
      switchMap(group => group.save())
    ).subscribe(
      () => {
        this.iamGroupsComponent.clearSelection();
        this.iamGroupsComponent.fetchUsers();
      }
    );
  }

  attachUsersToGroup() {
    this.router.navigate(['attach-groups'], { relativeTo: this.route });
  }

  private fetchGroup() {
    this.group$ = this.iamService.fetchGroup(this.groupId, true);
  }

}
