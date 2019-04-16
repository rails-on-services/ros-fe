import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DismissableContentComponent } from './dismissable-content.component';

describe('DismissableContentComponent', () => {
  let component: DismissableContentComponent;
  let fixture: ComponentFixture<DismissableContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DismissableContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DismissableContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
