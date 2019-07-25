import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IamGroupComponent } from './iam-group.component';
import { SharedModule } from 'src/shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { IamUsersComponent } from '../../iam-users/iam-users.component';
import { TableActionsManagementComponent, FilterableTableComponent, DismissibleContentComponent } from '@perx/open-ui-components';

describe('IamGroupComponent', () => {
  let component: IamGroupComponent;
  let fixture: ComponentFixture<IamGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule,
        HttpClientModule,
        RouterTestingModule,
        NoopAnimationsModule
      ],
      declarations: [
        IamGroupComponent,
        IamUsersComponent,
        TableActionsManagementComponent,
        FilterableTableComponent,
        DismissibleContentComponent]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IamGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
