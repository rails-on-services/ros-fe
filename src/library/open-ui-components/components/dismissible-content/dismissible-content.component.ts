import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-dismissible-content',
  templateUrl: './dismissible-content.component.html',
  styleUrls: ['./dismissible-content.component.scss']
})
export class DismissibleContentComponent implements OnInit {

  @Output() closeButtonClick = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  close() {
    this.closeButtonClick.emit();
  }
}
