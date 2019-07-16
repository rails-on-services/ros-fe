import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RenameModal } from './rename-modal.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SharedModule } from 'src/shared/shared.module';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('RenameModalComponent', () => {
  let component: RenameModal;
  let fixture: ComponentFixture<RenameModal>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule,
        ReactiveFormsModule,
        FormsModule,
        NoopAnimationsModule
      ],
      declarations: [ RenameModal ],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: [] }
      ]
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
