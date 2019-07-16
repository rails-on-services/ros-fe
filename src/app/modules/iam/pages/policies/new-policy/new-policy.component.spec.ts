import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPolicyComponent } from './new-policy.component';
import { SharedModule } from 'src/shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

describe('NewPolicyComponent', () => {
  let component: NewPolicyComponent;
  let fixture: ComponentFixture<NewPolicyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule,
        HttpClientModule,
        RouterTestingModule,
        NoopAnimationsModule,
        ReactiveFormsModule,
        FormsModule
      ],
      declarations: [ NewPolicyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewPolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
