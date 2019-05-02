import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewIamUserComponent } from './new-iam-user.component';

describe('NewIamUserComponent', () => {
  let component: NewIamUserComponent;
  let fixture: ComponentFixture<NewIamUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewIamUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewIamUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
