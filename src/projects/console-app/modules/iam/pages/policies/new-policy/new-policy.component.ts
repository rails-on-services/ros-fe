import { Component } from '@angular/core';
import { ModalService } from '../../../../../../../shared/services/modal.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, Validators, FormArray, FormBuilder } from '@angular/forms';
import { IamService, IamPolicy } from '@perx/open-services';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-new-policy',
  templateUrl: './new-policy.component.html',
  styleUrls: ['./new-policy.component.scss']
})
export class NewPolicyComponent {
  isEditable = true;
  goNextStepTriggered = false;
  createPolicynamePage: boolean;
  reviewPage: boolean;
  policy$: Observable<IamPolicy>;
  policyDetailsForm: FormGroup;

  constructor(
    private modalService: ModalService,
    private router: Router,
    private route: ActivatedRoute,
    private iamService: IamService,
    private fb: FormBuilder
  ) {
    this.createPolicynamePage = true;
    this.reviewPage = false;
    this.policyDetailsForm = this.fb.group({
      policyName: ['', [Validators.required, Validators.maxLength(128)]],
      policyDescription: ['', [Validators.maxLength(1000)]],
      permissions: this.fb.array([
        this.fb.group({
          service: ['', [Validators.required]],
          actions: this.fb.group({
            list: [''],
            read: [''],
            tagging: [''],
            write: [''],
            permissionManagement: ['']
          }),
          conditions: this.fb.group({
            mfa: [''],
            sourceIp: ['']
          })
        })
      ])
    });
  }

  get permissionLists() {
    return this.policyDetailsForm.get('permissions') as FormArray;
  }

  hasError(controlName: string, errorName: string) {
    return this.policyDetailsForm.controls[controlName].hasError(errorName);
  }

  hasPermissionError(permission: FormGroup, controlName: string, errorName: string) {
    const result = this.goNextStepTriggered && permission.controls[controlName].invalid;
    return result;
  }

  addAdditionalPermission() {
    this.permissionLists.push(
      this.fb.group({
        service: ['', [Validators.required]],
        actions: this.fb.group({
          list: [''],
          read: [''],
          tagging: [''],
          write: [''],
          permissionManagement: ['']
        }),
        conditions: this.fb.group({
          mfa: [''],
          sourceIp: ['']
        })
      }));
  }

  deletePermission(index: number) {
    this.permissionLists.removeAt(index);
  }
  cancelClicked() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  trackByFn(index: number, item: FormGroup) {
    return index + item.get('service').value;
  }

  goNextStep() {
    this.goNextStepTriggered = true;
  }

  submitForm() {
    console.warn(this.policyDetailsForm.value);
    // const policy = {
    //   policyname: this.policyDetailsForm.get('policyName').value,
    //   policyDescription: this.policyDetailsForm.get('policyDescription').value,
    //   api: this.policyDetailsForm.get('hasProgrammaticAccess').value,
    //   console: this.policyDetailsForm.get('hasConsoleAccess').value,
    // };

    // this.policy$ = this.iamService.createPolicy(policy);
  }

  goBack() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
