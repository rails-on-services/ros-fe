import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CognitoAppComponent } from './cognito-app.component';
import { SharedModule } from 'src/shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { TableActionsManagementComponent, FilterableTableComponent } from '@perx/open-ui-components';

describe('CognitoAppComponent', () => {
  let component: CognitoAppComponent;
  let fixture: ComponentFixture<CognitoAppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule,
        HttpClientModule,
        RouterTestingModule,
        NoopAnimationsModule
      ],
      declarations: [
        CognitoAppComponent,
        TableActionsManagementComponent,
        FilterableTableComponent]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CognitoAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
