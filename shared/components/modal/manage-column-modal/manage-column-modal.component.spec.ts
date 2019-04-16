import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageColumnModal } from './manage-column-modal.component';

describe('TableColumnManagementModalComponent', () => {
  let component: ManageColumnModal;
  let fixture: ComponentFixture<ManageColumnModal>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageColumnModal ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageColumnModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
