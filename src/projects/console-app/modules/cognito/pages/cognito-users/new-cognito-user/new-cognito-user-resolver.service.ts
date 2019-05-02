import {Injectable} from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot, ActivatedRoute
} from '@angular/router';
import {Observable, of, EMPTY} from 'rxjs';

import {NewCognitoUserComponent} from './new-cognito-user.component';
import {ModalService} from '../../../../../../../shared/services/modal.service';

@Injectable({
  providedIn: 'root',
})
export class NewCognitoUserResolverService implements Resolve<NewCognitoUserComponent> {
  constructor(private modalService: ModalService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<NewCognitoUserComponent> | Observable<never> {

    this.modalService.componentToRender = NewCognitoUserComponent;

    this.modalService.previousURL = location.pathname;
    if (this.modalService.componentToRender) {
      return of(this.modalService.componentToRender);
    } else { // id not found
      this.router.navigate(['./users'], {relativeTo: this.route});
      return EMPTY;
    }
  }
}

