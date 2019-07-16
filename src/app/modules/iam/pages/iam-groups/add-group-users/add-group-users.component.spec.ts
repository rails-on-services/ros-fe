import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddGroupUsersComponent } from './add-group-users.component';
import { SharedModule } from 'src/shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { FilterableTableComponent, TableActionsManagementComponent } from '@perx/open-ui-components';

describe('AddGroupUsersComponent', () => {
  let component: AddGroupUsersComponent;
  let fixture: ComponentFixture<AddGroupUsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule,
        HttpClientModule,
        RouterTestingModule
      ],
      declarations: [
        AddGroupUsersComponent,
        FilterableTableComponent,
        TableActionsManagementComponent]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddGroupUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
