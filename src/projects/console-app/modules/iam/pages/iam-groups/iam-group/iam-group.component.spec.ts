import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IamGroupComponent } from './iam-group.component';

describe('IamGroupComponent', () => {
  let component: IamGroupComponent;
  let fixture: ComponentFixture<IamGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IamGroupComponent ]
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
