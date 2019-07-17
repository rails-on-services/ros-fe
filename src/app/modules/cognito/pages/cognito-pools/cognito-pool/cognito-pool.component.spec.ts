import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CognitoPoolComponent } from './cognito-pool.component';
import { SharedModule } from 'src/shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { CognitoUsersComponent } from '../../cognito-users/cognito-users.component';
import { TableActionsManagementComponent, FilterableTableComponent, DismissibleContentComponent } from '@perx/open-ui-components';

describe('CognitoPoolComponent', () => {
  let component: CognitoPoolComponent;
  let fixture: ComponentFixture<CognitoPoolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule,
        HttpClientModule,
        RouterTestingModule,
        NoopAnimationsModule
      ],
      declarations: [
        CognitoPoolComponent,
        CognitoUsersComponent,
        TableActionsManagementComponent,
        FilterableTableComponent,
        DismissibleContentComponent]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CognitoPoolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
