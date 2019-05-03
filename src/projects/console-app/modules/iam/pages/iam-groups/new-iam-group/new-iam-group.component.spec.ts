import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewIamGroupComponent } from './new-iam-group.component';

describe('NewGroupComponent', () => {
  let component: NewIamGroupComponent;
  let fixture: ComponentFixture<NewIamGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewIamGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewIamGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
