import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IamGroupsComponent } from './iam-groups.component';

describe('IamGroupsComponent', () => {
  let component: IamGroupsComponent;
  let fixture: ComponentFixture<IamGroupsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IamGroupsComponent ]
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
