import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IamPolicyComponent } from './iam-policy.component';
import { SharedModule } from 'src/shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { IamUsersComponent } from '../../iam-users/iam-users.component';
import { TableActionsManagementComponent, FilterableTableComponent, DismissibleContentComponent } from '@perx/open-ui-components';

describe('PolicyComponent', () => {
  let component: IamPolicyComponent;
  let fixture: ComponentFixture<IamPolicyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule,
        HttpClientModule,
        RouterTestingModule,
        NoopAnimationsModule
      ],
      declarations: [
        IamPolicyComponent,
        IamUsersComponent,
        TableActionsManagementComponent,
        FilterableTableComponent,
        DismissibleContentComponent]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IamPolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
