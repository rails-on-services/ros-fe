import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CognitoUsersComponent } from './cognito-users.component';
import { SharedModule } from 'src/shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { FilterableTableComponent, TableActionsManagementComponent, DismissableContentComponent } from '@perx/open-ui-components';

describe('CognitoUsersComponent', () => {
  let component: CognitoUsersComponent;
  let fixture: ComponentFixture<CognitoUsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule,
        HttpClientModule,
        RouterTestingModule
      ],
      declarations: [
        CognitoUsersComponent,
        DismissableContentComponent,
        FilterableTableComponent,
        TableActionsManagementComponent]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CognitoUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
