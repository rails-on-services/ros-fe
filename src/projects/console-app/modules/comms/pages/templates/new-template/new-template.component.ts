import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CommsService } from '@perx/open-services';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-new-template',
  templateUrl: './new-template.component.html',
  styleUrls: ['./new-template.component.scss']
})
export class NewTemplateComponent implements OnInit, AfterViewInit {
  templateDetailsGroup: FormGroup;
  isEditable = true;

  private templateUnsubscribe$ = new Subject<void>();

  constructor(private router: Router,
              private route: ActivatedRoute,
              private commsService: CommsService) {
  }

  ngOnInit() {
    this.templateDetailsGroup = new FormGroup({
      templateName: new FormControl('', [Validators.required, Validators.maxLength(140)]),
      content: new FormControl(''),
      status: new FormControl(''),
    });
  }

  ngAfterViewInit() {
    // fix ExpressionChangedAfterItHasBeenCheckedError
    // https://blog.angularindepth.com/everything-you-need-to-know-about-the-expressionchangedafterithasbeencheckederror-error-e3fd9ce7dbb4
  }

  hasError(controlName: string, errorName: string) {
    return this.templateDetailsGroup.controls[controlName].hasError(errorName);
  }


  cancelClicked() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  submitForm() {
    const template = {
      name: this.templateDetailsGroup.get('templateName').value,
      content: this.templateDetailsGroup.get('content').value,
      status: this.templateDetailsGroup.get('status').value,
    };

    this.commsService.createTemplate(template).pipe(takeUntil(this.templateUnsubscribe$)).subscribe(() => {
    });
  }

}
