import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IamGroupsComponent } from './iam-groups.component';
import { SharedModule } from 'src/shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { FilterableTableComponent, TableActionsManagementComponent } from '@perx/open-ui-components';

describe('IamGroupsComponent', () => {
  let component: IamGroupsComponent;
  let fixture: ComponentFixture<IamGroupsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule,
        HttpClientModule,
        RouterTestingModule
      ],
      declarations: [
        IamGroupsComponent,
        FilterableTableComponent,
        TableActionsManagementComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IamGroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
