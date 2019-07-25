import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableActionsManagementComponent } from './table-actions-management.component';
import { SharedModule } from 'src/shared/shared.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('TableActionsManagementComponent', () => {
  let component: TableActionsManagementComponent;
  let fixture: ComponentFixture<TableActionsManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule,
        HttpClientModule,
        NoopAnimationsModule
      ],
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
