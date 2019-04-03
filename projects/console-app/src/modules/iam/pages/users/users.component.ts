import {
  Component,
  ComponentRef, ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  showModal: boolean;
  @ViewChild('dismissable') private dismissableElement: ElementRef;

  constructor() {
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
