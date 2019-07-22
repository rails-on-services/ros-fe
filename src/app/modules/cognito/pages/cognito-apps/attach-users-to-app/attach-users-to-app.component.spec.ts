import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttachUsersToAppComponent } from './attach-users-to-app.component';

describe('AttachUsersToAppComponent', () => {
  let component: AttachUsersToAppComponent;
  let fixture: ComponentFixture<AttachUsersToAppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttachUsersToAppComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttachUsersToAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
