import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterableTableComponent } from './filterable-table.component';
import { SharedModule } from 'src/shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

describe('FilterableTableComponent', () => {
  let component: FilterableTableComponent;
  let fixture: ComponentFixture<FilterableTableComponent>;

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
      declarations: [ FilterableTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterableTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
