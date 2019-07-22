import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttachUsersToPoolComponent } from './attach-users-to-pool.component';
import { SharedModule } from 'src/shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { FilterableTableComponent, TableActionsManagementComponent } from '@perx/open-ui-components';

describe('AttachUsersToPoolComponent', () => {
  let component: AttachUsersToPoolComponent;
  let fixture: ComponentFixture<AttachUsersToPoolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule,
        HttpClientModule,
        RouterTestingModule
      ],
      declarations: [
        AttachUsersToPoolComponent,
        FilterableTableComponent,
        TableActionsManagementComponent]
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttachUsersToPoolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
