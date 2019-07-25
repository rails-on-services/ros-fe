import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CommsService } from '@perx/open-services/dist/open-services';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-new-provider',
  templateUrl: './new-provider.component.html',
  styleUrls: ['./new-provider.component.scss']
})
export class NewProviderComponent implements OnInit {
  providerDetailsGroup: FormGroup;
  isEditable: boolean = true;

  private providerUnsubscribe$: Subject<void> = new Subject<void>();

  constructor(private router: Router,
              private route: ActivatedRoute,
              private commsService: CommsService) {
  }

  ngOnInit(): void {
    this.providerDetailsGroup = new FormGroup({
      providerName: new FormControl('', [Validators.required, Validators.maxLength(140)]),
      encryptedSecret: new FormControl(''),
      encryptedSecretIv: new FormControl(''),
      key: new FormControl(''),
    });
  }

  hasError(controlName: string, errorName: string): boolean {
    return this.providerDetailsGroup.controls[controlName].hasError(errorName);
  }


  cancelClicked(): void {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  submitForm(): void {
    const provider = {
      name: this.providerDetailsGroup.get('providerName').value,
      encryptedSecret: this.providerDetailsGroup.get('encryptedSecret').value,
      encryptedSecretIv: this.providerDetailsGroup.get('encryptedSecretIv').value,
      key: this.providerDetailsGroup.get('key').value,
    };

    this.commsService.createProvider(provider).pipe(takeUntil(this.providerUnsubscribe$)).subscribe(() => {
      this.router.navigate(['../'], { relativeTo: this.route });
    });
  }

}
