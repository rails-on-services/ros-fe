import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommsComponent } from './comms.component';
import { SharedModule } from 'src/shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { ServiceMenuComponent } from 'src/app/core/components/service-menu/service-menu.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('CommsComponent', () => {
  let component: CommsComponent;
  let fixture: ComponentFixture<CommsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule,
        HttpClientModule,
        RouterTestingModule,
        NoopAnimationsModule
      ],
      declarations: [ CommsComponent, ServiceMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
