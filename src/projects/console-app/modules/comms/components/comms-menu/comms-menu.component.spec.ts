import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommsMenuComponent } from './comms-menu.component';

describe('CommsMenuComponent', () => {
  let component: CommsMenuComponent;
  let fixture: ComponentFixture<CommsMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommsMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommsMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
