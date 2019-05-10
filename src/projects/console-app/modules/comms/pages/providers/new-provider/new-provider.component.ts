import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CommsService } from '@perx/open-services';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-new-provider',
  templateUrl: './new-provider.component.html',
  styleUrls: ['./new-provider.component.scss']
})
export class NewProviderComponent implements OnInit, AfterViewInit {
  providerDetailsGroup: FormGroup;
  isEditable = true;

  private providerUnsubscribe$ = new Subject<void>();

  constructor(private router: Router,
              private route: ActivatedRoute,
              private commsService: CommsService) {
  }

  ngOnInit() {
    this.providerDetailsGroup = new FormGroup({
      providerName: new FormControl('', [Validators.required, Validators.maxLength(140)]),
      encryptedSecret: new FormControl(''),
      encryptedSecretIv: new FormControl(''),
      key: new FormControl(''),
    });
  }

  ngAfterViewInit() {
    // fix ExpressionChangedAfterItHasBeenCheckedError
    // https://blog.angularindepth.com/everything-you-need-to-know-about-the-expressionchangedafterithasbeencheckederror-error-e3fd9ce7dbb4
  }

  hasError(controlName: string, errorName: string) {
    return this.providerDetailsGroup.controls[controlName].hasError(errorName);
  }


  cancelClicked() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  submitForm() {
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
