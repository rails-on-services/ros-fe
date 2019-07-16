import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageColumnModal } from './manage-column-modal.component';
import { SharedModule } from 'src/shared/shared.module';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

describe('TableColumnManagementModalComponent', () => {
  let component: ManageColumnModal;
  let fixture: ComponentFixture<ManageColumnModal>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule
      ],
      declarations: [ ManageColumnModal ],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: [] }
      ]
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
