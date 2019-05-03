import {Injectable} from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot, ActivatedRoute
} from '@angular/router';
import {Observable, of, EMPTY} from 'rxjs';

import {NewTemplateComponent} from './new-template.component';
import {ModalService} from 'src/shared/services/modal.service';

@Injectable({
  providedIn: 'root',
})
export class NewTemplateResolverService implements Resolve<NewTemplateComponent> {
  constructor(private modalService: ModalService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<NewTemplateComponent> | Observable<never> {

    this.modalService.componentToRender = NewTemplateComponent;

    this.modalService.previousURL = location.pathname;
    if (this.modalService.componentToRender) {
      return of(this.modalService.componentToRender);
    } else { // id not found
      this.router.navigate(['./users'], {relativeTo: this.route});
      return EMPTY;
    }
  }
}

