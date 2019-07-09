import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { IamService, IamGroup } from '@perx/open-services';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SelectionModel } from '@angular/cdk/collections';
import { IamGroupsComponent } from '../../iam-groups/iam-groups.component';

@Component({
  selector: 'app-iam-user',
  templateUrl: './iam-user.component.html',
  styleUrls: ['./iam-user.component.scss'],
})
export class IamUserComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['groupName', 'remove'];

  @ViewChild(IamGroupsComponent) iamGroupsComponent: IamGroupsComponent;
  private sub: any;
  user$: Observable<any>;
  userId: number;

  constructor(
    private iamService: IamService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.userId = params['id'];
    });
    this.fetchUser();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  detachGroupsFromUser(selection: SelectionModel<IamGroup>) {
    const selectedGroups = selection.selected.map(item => item.id);
    this.iamService.fetchUser(this.userId).subscribe(user => {
      user.groups = user.groups.filter(item => !selectedGroups.includes(item.id));
      user.save().subscribe(
        () => {
          this.iamGroupsComponent.clearSelection();
          this.iamGroupsComponent.fetchGroups();
        }
      );
    });
  }

  attachGroupsToCampaign() {
    this.router.navigate(['attach-groups'], { relativeTo: this.route });
  }

  private fetchUser() {
    this.user$ = this.iamService.fetchUser(this.userId);
  }

}
