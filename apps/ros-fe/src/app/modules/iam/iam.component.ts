import { Component } from '@angular/core';

@Component({
  selector: 'app-iam',
  templateUrl: './iam.component.html',
  styleUrls: ['./iam.component.scss']
})
export class IamComponent {

  menus: {
    route: string;
    display: string;
  }[] = [
      { route: 'home', display: 'Main' },
      { route: 'users', display: 'Users' },
      { route: 'groups', display: 'Groups' },
      { route: 'policies', display: 'Policies' }
    ];

}
