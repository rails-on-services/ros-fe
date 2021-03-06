import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewIamGroupComponent } from './new-iam-group.component';
import { SharedModule } from 'src/shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { FilterableTableComponent, TableActionsManagementComponent } from '@perx/open-ui-components';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('NewGroupComponent', () => {
  let component: NewIamGroupComponent;
  let fixture: ComponentFixture<NewIamGroupComponent>;

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
      declarations: [
        NewIamGroupComponent,
        FilterableTableComponent,
        TableActionsManagementComponent]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewIamGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
