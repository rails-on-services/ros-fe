import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IamHomeComponent } from './iam-home.component';

describe('IamHomeComponent', () => {
  let component: IamHomeComponent;
  let fixture: ComponentFixture<IamHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IamHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IamHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
