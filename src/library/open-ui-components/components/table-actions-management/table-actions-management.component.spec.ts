import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableActionsManagementComponent } from './table-actions-management.component';

describe('TableActionsManagementComponent', () => {
  let component: TableActionsManagementComponent;
  let fixture: ComponentFixture<TableActionsManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableActionsManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableActionsManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
