import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommsService } from '@perx/open-services';
import { takeUntil } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { TableHeaderProperties } from 'src/shared/models/tableHeaderProperties';
import { TableActionsManagementComponent } from '@perx/open-ui-components';

@Component({
  selector: 'app-new-campaign',
  templateUrl: './new-campaign.component.html',
  styleUrls: ['./new-campaign.component.scss']
})
export class NewCampaignComponent implements OnInit, AfterViewInit {
  cognitoPools$: Observable<any[]>;
  shownColumns: (string | number | symbol)[];
  campaignTableDisplayProperties: TableHeaderProperties[] = [];
  @ViewChild(TableActionsManagementComponent) tableActionsManagementComponent: TableActionsManagementComponent;

  // todo: replace this object with a API call to retrieve list of types of campaigns
  owners: {type: string, id: string}[] = [
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
  isEditable: boolean = true;

  private campaignUnsubscribe$: Subject<void> = new Subject<void>();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private commService: CommsService,
    private formBuilder: FormBuilder
  ) { }

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
  }

  get formArray(): AbstractControl | null {
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
      this.router.navigate(['../'], { relativeTo: this.route });
    });
  }


  get columnProperties() {
    return this.campaignTableDisplayProperties;
  }

}
