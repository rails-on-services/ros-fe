import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, Validators, FormArray, FormBuilder } from '@angular/forms';
import { IamPolicy } from '@perx/open-services/dist/open-services';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-new-iam-policy',
  templateUrl: './new-iam-policy.component.html',
  styleUrls: ['./new-iam-policy.component.scss']
})
export class NewIamPolicyComponent {
  isEditable: boolean = true;
  goNextStepTriggered: boolean = false;
  createPolicynamePage: boolean;
  reviewPage: boolean;
  policy$: Observable<IamPolicy>;
  policyDetailsForm: FormGroup;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
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

  get permissionLists(): FormArray {
    return this.policyDetailsForm.get('permissions') as FormArray;
  }

  hasError(controlName: string, errorName: string): boolean {
    return this.policyDetailsForm.controls[controlName].hasError(errorName);
  }

  hasPermissionError(permission: FormGroup, controlName: string): boolean {
    const result = this.goNextStepTriggered && permission.controls[controlName].invalid;
    return result;
  }

  addAdditionalPermission(): void {
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

  deletePermission(index: number): void {
    this.permissionLists.removeAt(index);
  }
  cancelClicked(): void {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  trackByFn(index: number, item: FormGroup): void {
    return index + item.get('service').value;
  }

  goNextStep(): void {
    this.goNextStepTriggered = true;
  }

  submitForm(): void {
    console.warn(this.policyDetailsForm.value);
    // const policy = {
    //   policyname: this.policyDetailsForm.get('policyName').value,
    //   policyDescription: this.policyDetailsForm.get('policyDescription').value,
    //   api: this.policyDetailsForm.get('hasProgrammaticAccess').value,
    //   console: this.policyDetailsForm.get('hasConsoleAccess').value,
    // };

    // this.policy$ = this.iamService.createPolicy(policy);
  }

  goBack(): void {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
