import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RenameModal } from './rename-modal.component';

describe('RenameModalComponent', () => {
  let component: RenameModal;
  let fixture: ComponentFixture<RenameModal>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RenameModal ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RenameModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
