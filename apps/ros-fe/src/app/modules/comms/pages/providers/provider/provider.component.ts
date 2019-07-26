import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { CommsService } from '@perx/open-services';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-provider',
  templateUrl: './provider.component.html',
  styleUrls: ['./provider.component.scss']
})
export class ProviderComponent implements OnInit, OnDestroy {
  private sub: any;
  provider$: Observable<any>;
  id: number;

  constructor(
    private commsService: CommsService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      this.id = params[`id`];
    });
    this.fetchProvider();
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  private fetchProvider(): void {
    this.provider$ = this.commsService.fetchProvider(this.id).pipe(
      map(providerDetails => {
        const provider = {
          ...providerDetails
        };
        return provider;
      })
    );
  }
}
