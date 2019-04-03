import {
  Component,
  ComponentRef, ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {DismissableContentComponent} from '../../../../shared/components/dismissable-content/dismissable-content.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  showModal: boolean;
  dialogComponentRef: ComponentRef<DismissableContentComponent>;
  @ViewChild('dismissable') private dismissableElement: ElementRef;

  // @ts-ignore
  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    this.showModal = false;
  }

  ngOnInit() {
  }

  addUser() {
    // todo: fill in adding mock user
    return;
  }

  removeUsers() {
    // todo: import from mock user list
    return;
  }

  openModal() {
    // this.showModal = true;
  }

  closeModal() {
    // this.showModal = false;
  }

  private removeDialogComponentFromBody() {
    this.dismissableElement.nativeElement.remove();
  }

  closeButtonClick() {
    this.removeDialogComponentFromBody();
  }

}
