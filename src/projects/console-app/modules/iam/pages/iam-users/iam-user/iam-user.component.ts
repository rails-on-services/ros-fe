import { Component, OnInit, OnDestroy } from '@angular/core';
import { IamService, IamUser, IamGroup } from '@perx/open-services';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-iam-user',
  templateUrl: './iam-user.component.html',
  styleUrls: ['./iam-user.component.scss'],
})
export class IamUserComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['groupName', 'remove'];

  user$: Observable<IamUser>;
  user: IamUser;

  private userUnsubscribe$ = new Subject<void>();
  private paramsUnsubscribe$ = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private iamService: IamService
  ) { }

  ngOnInit() {
    this.route.params.pipe(takeUntil(this.paramsUnsubscribe$)).subscribe((params: Params) => {
      this.iamService.getUser(params.id).pipe(takeUntil(this.userUnsubscribe$))
        .subscribe((user: IamUser) => {
          this.user = user;
        });
    });
  }

  ngOnDestroy() {
    this.userUnsubscribe$.next();
    this.userUnsubscribe$.complete();

    this.paramsUnsubscribe$.next();
    this.paramsUnsubscribe$.complete();
  }

  onRemove(group: IamGroup) {
    const newGroups = this.user.groups.filter(g => g.id !== group.id);
    this.user.groups = newGroups;
    this.user.save().subscribe();
  }
}
