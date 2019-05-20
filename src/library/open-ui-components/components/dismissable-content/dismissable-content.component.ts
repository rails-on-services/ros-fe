import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-dismissable-content',
  templateUrl: './dismissable-content.component.html',
  styleUrls: ['./dismissable-content.component.scss']
})
export class DismissableContentComponent implements OnInit {

  @Output() closeButtonClick = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  close() {
    this.closeButtonClick.emit();
  }
}
