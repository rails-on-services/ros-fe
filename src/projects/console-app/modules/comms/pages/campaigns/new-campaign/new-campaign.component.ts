import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ModalService } from '../../../../../../../shared/services/modal.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CommsService, CommsMessage } from '@perx/open-services';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-new-campaign',
  templateUrl: './new-campaign.component.html',
  styleUrls: ['./new-campaign.component.scss']
})
export class NewCampaignComponent implements OnInit, AfterViewInit {
  selection: CommsMessage[];
  shownColumns: (string|number|symbol)[];

  campaignDetailsGroup: FormGroup;
  isEditable = true;

  createMessagenamePage: boolean;
  reviewPage: boolean;

  private campaignUnsubscribe$ = new Subject<void>();

  constructor(private modalService: ModalService,
              private router: Router,
              private route: ActivatedRoute,
              private commService: CommsService,
              private _formBuilder: FormBuilder) {
    this.createMessagenamePage = true;
    this.reviewPage = false;
  }

  ngOnInit() {
    this.campaignDetailsGroup = this._formBuilder.group({
      formArray: this._formBuilder.array([
        this._formBuilder.group({
          ownerId: ['', [Validators.required, Validators.maxLength(100)]],
          ownerType: ['', Validators.required],
        }),
        this._formBuilder.group({
          cognitoEndpointId: [''],
        }),
      ])
    });
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
      ownerId: this.formArray.get([0]).get('owner').value,
      ownerType: this.formArray.get([0]).get('ownerType').value,
      cognitoEndpointId: this.formArray.get([1]).get('cognitoEndpointId').value,
    };
    this.commService.createCampaign(campaign).pipe(takeUntil(this.campaignUnsubscribe$)).subscribe(() => { return; });
  }

  goBack() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

}
