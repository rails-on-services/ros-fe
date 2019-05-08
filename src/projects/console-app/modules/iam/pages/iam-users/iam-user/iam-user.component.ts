import { Component, OnInit } from '@angular/core';
import { IamService, IamUser } from '@perx/open-services';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-iam-user',
  templateUrl: './iam-user.component.html',
  styleUrls: ['./iam-user.component.scss']
})
export class IamUserComponent implements OnInit {

  user$: Observable<IamUser>;

  constructor(
    private route: ActivatedRoute,
    private iamService: IamService
  ) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.user$ = this.iamService.getUser(params.id);
    });
  }
}
