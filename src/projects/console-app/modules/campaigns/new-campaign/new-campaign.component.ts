import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ModalService } from '../../../../../shared/services/modal.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IamService, IamGroup, IamPolicy } from '@perx/open-services';
import { Observable } from 'rxjs';
import { SelectionModel } from '@angular/cdk/collections';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-new-campaign',
  templateUrl: './new-campaign.component.html',
  styleUrls: ['./new-campaign.component.scss']
})
export class NewCampaignComponent implements OnInit, AfterViewInit {
  types = [
    {
      image: 'gift-box',
      text: 'Instant Reward',
      isEnabled: false,
    },
    {
      image: 'stamp',
      text: 'Stamps',
      isEnabled: false,
    },
    {
      image: 'star',
      text: 'Points',
      isEnabled: false,
    },
    {
      image: 'add-user',
      text: 'Referral',
      isEnabled: false,
    },
    {
      image: 'computer',
      text: 'Survey',
      isEnabled: false,
    },
    {
      image: 'gift-card',
      text: 'Scratch Card',
      isEnabled: false,
    },
    {
      image: 'big-wheel',
      text: 'Spin the wheel',
      isEnabled: false,
    },
    {
      image: 'christmas-tree',
      text: 'Shake the tree',
      isEnabled: false,
    },
    {
      image: 'check-list',
      text: 'Quiz',
      isEnabled: false,
    },
    {
      image: 'egg',
      text: 'Crack the egg',
      isEnabled: false,
    },
    {
      image: 'old-man',
      text: 'Spank the uncle',
      isEnabled: false,
    },
    {
      image: 'dolphin',
      text: 'Flung the dolphin',
      isEnabled: false,
    }
  ];

  newCampaignFormGroup: FormGroup;

  constructor(
    private modalService: ModalService,
    private router: Router,
    private route: ActivatedRoute,
    private iamService: IamService
  ) {}

  ngOnInit() {
    this.newCampaignFormGroup = new FormGroup({
      campaignName: new FormControl('', [Validators.required, Validators.maxLength(60)]),
      campaignType: new FormControl(),
      surveyQuestions: new FormControl([
        {
          type: 'type1',
          question: 'Q1',
          answers: 'A1'
        },
        {
          type: 'type2',
          question: 'Q2',
          answers: 'A2'
        }
      ]),
    });
  }

  ngAfterViewInit() {
  }

  // hasError(controlName: string, errorName: string) {
  //   return this.newCampaignFormGroup.controls[controlName].hasError(errorName);
  // }

  get surveyQuestions() {
    return this.newCampaignFormGroup.get('surveyQuestions').value;
  }

  submitForm() {
    const policies = [];
    if (this.newCampaignFormGroup.get('attachedPolicies').value) {
      this.newCampaignFormGroup.get('attachedPolicies').value.forEach((policy) => {
          policies.push(policy.id);
        }
      );
    }

    const group = {
      name: this.newCampaignFormGroup.get('name').value,
      attachedPolicies: policies,
      users: this.newCampaignFormGroup.get('users').value
    };
  }

  hasError(controlName: string, errorName: string) {
    return this.newCampaignFormGroup.controls[controlName].hasError(errorName);
  }

  goBack() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
