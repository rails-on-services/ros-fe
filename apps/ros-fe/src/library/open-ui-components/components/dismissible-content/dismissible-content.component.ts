import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-dismissible-content',
  templateUrl: './dismissible-content.component.html',
  styleUrls: ['./dismissible-content.component.scss']
})
export class DismissibleContentComponent implements OnInit {

  @Output() closeButtonClick: EventEmitter<any> = new EventEmitter();

  ngOnInit(): void {
  }

  close(): void {
    this.closeButtonClick.emit();
  }
}
