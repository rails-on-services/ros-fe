import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommsProvidersComponent } from './providers.component';

describe('UsersComponent', () => {
  let component: CommsProvidersComponent;
  let fixture: ComponentFixture<CommsProvidersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommsProvidersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommsProvidersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
