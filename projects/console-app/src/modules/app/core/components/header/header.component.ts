import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input() enableMenuButton = false;
  expandMenu = false;
  @Output() menuButtonClick = new EventEmitter<boolean>();

  constructor() {
  }

  ngOnInit() {

  }

  buttonClicked() {
    // this.expandMenu = !this.expandMenu;
    this.menuButtonClick.emit(this.expandMenu);
  }
}
