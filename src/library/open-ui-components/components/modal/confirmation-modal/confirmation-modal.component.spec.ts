import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmationModal } from './confirmation-modal.component';
import { SharedModule } from 'src/shared/shared.module';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

describe('ConfirmationModalComponent', () => {
  let component: ConfirmationModal;
  let fixture: ComponentFixture<ConfirmationModal>;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule
      ],
      declarations: [ConfirmationModal],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: [] }
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmationModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
