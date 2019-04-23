import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ModalService } from '../../../../../../../shared/services/modal.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IamService, IamGroup, IamPolicy } from '@perx/open-services';
import { Observable } from 'rxjs';
import { JsonApiQueryData } from 'angular2-jsonapi';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-new-group',
  templateUrl: './new-group.component.html',
  styleUrls: ['./new-group.component.scss']
})
export class NewGroupComponent implements OnInit, AfterViewInit {
  document$: Observable<JsonApiQueryData<IamPolicy>>;
  selection: IamPolicy[];


  groupDetailsGroup: FormGroup;
  isEditable = true;

  createGroupnamePage: boolean;
  reviewPage: boolean;

  group$: Observable<IamGroup>;

  constructor(private modalService: ModalService,
              private router: Router,
              private route: ActivatedRoute,
              private iamService: IamService) {
    this.createGroupnamePage = true;
    this.reviewPage = false;
  }

  ngOnInit() {
    this.groupDetailsGroup = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.maxLength(60)]),
      attachedPolicies: new FormControl([]),
      users: new FormControl({}),
    });

    this.fetchPolicies();
  }

  ngAfterViewInit() {
    // fix ExpressionChangedAfterItHasBeenCheckedError
    // https://blog.angularindepth.com/everything-you-need-to-know-about-the-expressionchangedafterithasbeencheckederror-error-e3fd9ce7dbb4
  }


  onPolicySelectionChange(selection: SelectionModel<IamPolicy>) {
    this.selection = selection.selected;
    this.groupDetailsGroup.controls.attachedPolicies.setValue(selection.selected);
  }

  hasError(controlName: string, errorName: string) {
    return this.groupDetailsGroup.controls[controlName].hasError(errorName);
  }


  cancelClicked() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  submitForm() {

    // should only need ids of attached policies and let the backend do the heavy lifiting
    const policies = [];
    if (this.groupDetailsGroup.get('attachedPolicies').value) {
      this.groupDetailsGroup.get('attachedPolicies').value.forEach((policy) => {
          policies.push(policy.id);
        }
      );
    }

    const group = {
      name: this.groupDetailsGroup.get('name').value,
      attachedPolicies: policies,
      users: this.groupDetailsGroup.get('users').value
    };
    this.group$ = this.iamService.createGroup(group);
  }

  goBack() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  private fetchPolicies() {
    this.document$ = this.iamService.fetchPolicies();
  }
}
