import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IamComponent } from './iam.component';
import { SharedModule } from 'src/shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceMenuComponent } from 'src/app/core/components/service-menu/service-menu.component';

describe('IamComponent', () => {
  let component: IamComponent;
  let fixture: ComponentFixture<IamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule,
        HttpClientModule,
        RouterTestingModule,
        NoopAnimationsModule
      ],
      declarations: [ IamComponent, ServiceMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
