import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FeatureFlagsService {

  showme = false;
  donut = false;

  constructor() {
    if (!environment.production) {
      this.showme = true;
      // this.donut = true;
    }
  }
}
