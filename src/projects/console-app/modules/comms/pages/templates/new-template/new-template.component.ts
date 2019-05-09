import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
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
              private commsService: CommsService,
              private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.templateDetailsGroup = this.formBuilder.group({
      formArray: this.formBuilder.array([
        this.formBuilder.group({
          templateName: ['', [Validators.required, Validators.maxLength(140)]],
          description: [('')],
          content: [''],
          status: ['']
        }),
      ])
    });

  }

  get formArray(): AbstractControl|null {
    return this.templateDetailsGroup.get('formArray');
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
    const template = {
      name: this.formArray.get([0]).get('templateName').value,
      description: this.formArray.get([0]).get('description').value,
      content: this.formArray.get([0]).get('content').value,
      status: this.formArray.get([0]).get('status').value,
    };

    this.commsService.createTemplate(template).pipe(takeUntil(this.templateUnsubscribe$)).subscribe(() => {
      this.router.navigate(['../'], { relativeTo: this.route });
    });
  }

}
