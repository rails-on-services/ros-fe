import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommsService, IamService, IamGroup } from '@perx/open-services';
import { map, takeUntil } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-new-campaign',
  templateUrl: './new-campaign.component.html',
  styleUrls: ['./new-campaign.component.scss']
})
export class NewCampaignComponent implements OnInit, AfterViewInit {
  cognitoGroups$: Observable<any[]>;
  selection: IamGroup[];
  shownColumns: (string|number|symbol)[];

  campaignDetailsGroup: FormGroup;
  isEditable = true;

  private campaignUnsubscribe$ = new Subject<void>();

  constructor(private router: Router,
              private route: ActivatedRoute,
              private commService: CommsService,
              private iamService: IamService,
              private _formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.campaignDetailsGroup = this._formBuilder.group({
      formArray: this._formBuilder.array([
        this._formBuilder.group({
          name: ['', [Validators.required, Validators.maxLength(140)]],
          ownerId: [''],
          ownerType: [''],
        }),
        this._formBuilder.group({
          cognitoEndpointId: [''],
        }),
      ])
    });

    this.fetchGroups();
  }
  get formArray(): AbstractControl | null {return this.campaignDetailsGroup.get('formArray'); }

  ngAfterViewInit() {
    // fix ExpressionChangedAfterItHasBeenCheckedError
    // https://blog.angularindepth.com/everything-you-need-to-know-about-the-expressionchangedafterithasbeencheckederror-error-e3fd9ce7dbb4
  }

  hasError(section: number, controlName: string, errorName: string) {
    return this.formArray.get([section]).get(controlName).hasError(errorName);
  }


  cancelClicked() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  submitForm() {

    const campaign = {
      name: this.formArray.get([0]).get('name').value,
      ownerId: this.formArray.get([0]).get('ownerId').value,
      ownerType: this.formArray.get([0]).get('ownerType').value,
      cognitoEndpointId: this.formArray.get([1]).get('cognitoEndpointId').value,
    };
    this.commService.createCampaign(campaign).pipe(takeUntil(this.campaignUnsubscribe$)).subscribe(() => { return; });
  }


  get columnProperties() {
    // todo: change IAM to Cognito
    return IamGroup.prototype.getColumnProperties();
  }

  onCognitoGroupSelectionChange(selection: SelectionModel<IamGroup>) {
    this.selection = selection.selected;
    this.formArray.get([1]).get('cognitoEndpointId').setValue(selection.selected[0].id);
  }

  private fetchGroups() {
    this.cognitoGroups$ = this.iamService.fetchGroups().pipe(
      map(document => {
        const iamGroups = document.getModels();
        const groups = iamGroups.map(iamGroup => {
          const group = { id: iamGroup.id };
          const keys = Object.keys(iamGroup.getColumnProperties());

          keys.forEach(key => {
            group[key] = iamGroup[key];
          });

          return group;
        });

        return groups;
      })
    );
  }

}
