import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ModalService } from '../../../../../../../shared/services/modal.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CommsService, CommsMessage } from '@perx/open-services';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-new-message',
  templateUrl: './new-message.component.html',
  styleUrls: ['./new-message.component.scss']
})
export class NewMessageComponent implements OnInit, AfterViewInit {
  selection: CommsMessage[];
  shownColumns: (string|number|symbol)[];

  messageDetailsMessage: FormGroup;
  isEditable = true;

  createMessagenamePage: boolean;
  reviewPage: boolean;

  message$: Observable<CommsMessage>;

  constructor(private modalService: ModalService,
              private router: Router,
              private route: ActivatedRoute,
              private commService: CommsService) {
    this.createMessagenamePage = true;
    this.reviewPage = false;
  }

  ngOnInit() {
    this.messageDetailsMessage = new FormGroup(
      {
        name: new FormControl('', [Validators.required, Validators.maxLength(60)]),
        channel: this.messageDetailsMessage.get('channel').value,
        from: new FormControl(''),
        to: new FormControl(''),
        ownerType: new FormControl(''),
      });

  }

  ngAfterViewInit() {
    // fix ExpressionChangedAfterItHasBeenCheckedError
    // https://blog.angularindepth.com/everything-you-need-to-know-about-the-expressionchangedafterithasbeencheckederror-error-e3fd9ce7dbb4
  }


  hasError(controlName: string, errorName: string) {
    return this.messageDetailsMessage.controls[controlName].hasError(errorName);
  }


  cancelClicked() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  submitForm() {

    // should only need ids of attached policies and let the backend do the heavy lifiting
    const policies = [];
    if (this.messageDetailsMessage.get('attachedPolicies').value) {
      this.messageDetailsMessage.get('attachedPolicies').value.forEach((policy) => {
          policies.push(policy.id);
        }
      );
    }

    const message = {
      name: this.messageDetailsMessage.get('name').value,
      channel: this.messageDetailsMessage.get('channel').value,
      from: this.messageDetailsMessage.get('from').value,
      to: this.messageDetailsMessage.get('to').value,
      ownerType: this.messageDetailsMessage.get('ownerType').value
    };
    // {
    //   name: this.messageDetailsMessage.get('name').value,
    //   attachedPolicies: policies,
    //   users: this.messageDetailsMessage.get('users').value
    // };
    this.message$ = this.commService.createMessage(message);
  }

  goBack() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

}
