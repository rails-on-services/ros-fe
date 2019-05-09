import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommsService, CognitoService, CognitoPool } from '@perx/open-services';
import { map, takeUntil } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-new-campaign',
  templateUrl: './new-campaign.component.html',
  styleUrls: ['./new-campaign.component.scss']
})
export class NewCampaignComponent implements OnInit, AfterViewInit {
  cognitoPools$: Observable<any[]>;
  shownColumns: (string|number|symbol)[];

  // todo: replace this object with a API call to retrieve list of types of campaigns
  owners = [
    {
      type: 'Survey',
      id: '1'
    },
    {
      type: 'None',
      id: ''
    }
  ];

  campaignDetailsGroup: FormGroup;
  isEditable = true;

  private campaignUnsubscribe$ = new Subject<void>();

  constructor(private router: Router,
              private route: ActivatedRoute,
              private commService: CommsService,
              private cognitoService: CognitoService,
              private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.campaignDetailsGroup = this.formBuilder.group({
      formArray: this.formBuilder.array([
        this.formBuilder.group({
          name: ['', [Validators.required, Validators.maxLength(140)]],
          description: [''],
        }),
        this.formBuilder.group({
          cognitoEndpointId: [''],
          owner: ['']
        }),
      ])
    });

    this.fetchPools();
  }

  get formArray(): AbstractControl|null {
    return this.campaignDetailsGroup.get('formArray');
  }

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
      description: this.formArray.get([0]).get('description').value,
      ownerId: this.formArray.get([1]).get('owner').value.id,
      ownerType: this.formArray.get([1]).get('owner').value.type,
      cognitoEndpointId: this.formArray.get([1]).get('cognitoEndpointId').value,
    };
    this.commService.createCampaign(campaign).pipe(takeUntil(this.campaignUnsubscribe$)).subscribe(() => {
      return;
    });
  }


  get columnProperties() {
    return CognitoPool.prototype.getColumnProperties();
  }

  // onCognitoPoolSelectionChange(selection: SelectionModel<CognitoPool>) {
  //   this.selection = selection.selected;
  //   this.formArray.get([1]).get('cognitoEndpointId').setValue(selection.selected[0].id);
  // }

  private fetchPools() {
    this.cognitoPools$ = this.cognitoService.fetchPools().pipe(
      map(document => {
        const cognitoPools = document.getModels();
        const pools = cognitoPools.map(cognitoPool => {
          const pool = { id: cognitoPool.id };
          const keys = Object.keys(cognitoPool.getColumnProperties());

          keys.forEach(key => {
            pool[key] = cognitoPool[key];
          });

          return pool;
        });

        return pools;
      })
    );
  }

}
