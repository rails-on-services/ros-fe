import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-storage',
  templateUrl: './storage.component.html',
  styleUrls: ['./storage.component.scss']
})
export class StorageComponent implements OnInit {

  menus: {route: string, display: string}[] = [
    {route: 'files', display: 'Files'}
  ];

  constructor() { }

  ngOnInit() {
  }

}
