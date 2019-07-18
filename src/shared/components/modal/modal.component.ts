import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ModalService } from '../../services/modal.service';

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-modal',
  template: '',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit, AfterViewInit {

  constructor(private modalService: ModalService) {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    setTimeout(() => this.modalService.openDialog());
  }

}
