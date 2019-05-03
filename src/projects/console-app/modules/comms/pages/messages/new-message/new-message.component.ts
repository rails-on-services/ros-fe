import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ModalService } from '../../../../../../../shared/services/modal.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CommsService, CommsMessage } from '@perx/open-services';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-new-message',
  templateUrl: './new-message.component.html',
  styleUrls: ['./new-message.component.scss']
})
export class NewMessageComponent implements OnInit, AfterViewInit {
  selection: CommsMessage[];
  shownColumns: (string|number|symbol)[];

  messageDetailsGroup: FormGroup;
  isEditable = true;

  createMessagenamePage: boolean;
  reviewPage: boolean;

  private messageUnsubscribe$ = new Subject<void>();

  constructor(private modalService: ModalService,
              private router: Router,
              private route: ActivatedRoute,
              private commService: CommsService,
              private _formBuilder: FormBuilder) {
    this.createMessagenamePage = true;
    this.reviewPage = false;
  }

  ngOnInit() {
    this.messageDetailsGroup = this._formBuilder.group({
      formArray: this._formBuilder.array([
        this._formBuilder.group({
          name: ['', [Validators.required, Validators.maxLength(100)]],
          channel: ['', Validators.required],
        }),
        this._formBuilder.group({
          body: [''],
          from: [''],
          to: [''],
          ownerType: ['']
        }),
      ])
    });
  }
  get formArray(): AbstractControl | null {return this.messageDetailsGroup.get('formArray'); }

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

    const message = {
      name: this.formArray.get([0]).get('name').value,
      channel: this.formArray.get([0]).get('channel').value,
      body: this.formArray.get([1]).get('body').value,
      from: this.formArray.get([1]).get('from').value,
      to: this.formArray.get([1]).get('to').value,
      ownerType: this.formArray.get([1]).get('ownerType').value
    };
    this.commService.createMessage(message).pipe(takeUntil(this.messageUnsubscribe$)).subscribe(() => { return; });
  }

  goBack() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

}
