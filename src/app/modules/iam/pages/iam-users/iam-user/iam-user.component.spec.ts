import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IamUserComponent } from './iam-user.component';
import { SharedModule } from 'src/shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { IamGroupsComponent } from '../../iam-groups/iam-groups.component';
import { TableActionsManagementComponent, FilterableTableComponent } from '@perx/open-ui-components';

describe('IamUserComponent', () => {
  let component: IamUserComponent;
  let fixture: ComponentFixture<IamUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule,
        HttpClientModule,
        RouterTestingModule,
        NoopAnimationsModule
      ],
      declarations: [
        IamUserComponent,
        IamGroupsComponent,
        TableActionsManagementComponent,
        FilterableTableComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IamUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
