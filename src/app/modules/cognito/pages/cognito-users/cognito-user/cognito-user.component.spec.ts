import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CognitoUserComponent } from './cognito-user.component';
import { SharedModule } from 'src/shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { CognitoPoolsComponent } from '../../cognito-pools/cognito-pools.component';
import { TableActionsManagementComponent, FilterableTableComponent } from '@perx/open-ui-components';

describe('CognitoUserComponent', () => {
  let component: CognitoUserComponent;
  let fixture: ComponentFixture<CognitoUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule,
        HttpClientModule,
        RouterTestingModule,
        NoopAnimationsModule
      ],
      declarations: [
        CognitoUserComponent,
        CognitoPoolsComponent,
        TableActionsManagementComponent,
        FilterableTableComponent]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CognitoUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
