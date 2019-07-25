import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CognitoComponent } from './cognito.component';
import { SharedModule } from 'src/shared/shared.module';
import { RouterTestingModule } from '@angular/router/testing';
import { ServiceMenuModule } from 'src/app/core/components/service-menu/service-menu.module';
import { CORE_SERVICES_MENU, coreServicesMenuValue } from 'src/app/core/core-services-menu.value';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('CognitoComponent', () => {
  let component: CognitoComponent;
  let fixture: ComponentFixture<CognitoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule,
        NoopAnimationsModule,
        RouterTestingModule,
        ServiceMenuModule
      ],
      declarations: [CognitoComponent],
      providers: [{
        provide: CORE_SERVICES_MENU,
        useValue: coreServicesMenuValue
      }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CognitoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
