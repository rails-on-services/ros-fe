import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  showModal: boolean;

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
}
