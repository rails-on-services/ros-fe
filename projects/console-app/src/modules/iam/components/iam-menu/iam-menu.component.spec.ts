import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IamMenuComponent } from './iam-menu.component';

describe('IamMenuComponent', () => {
  let component: IamMenuComponent;
  let fixture: ComponentFixture<IamMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IamMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IamMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
