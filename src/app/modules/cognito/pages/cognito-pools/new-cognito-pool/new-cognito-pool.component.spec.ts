import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewCognitoPoolComponent } from './new-cognito-pool.component';
import { SharedModule } from 'src/shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FilterableTableComponent, TableActionsManagementComponent } from '@perx/open-ui-components';

describe('NewCognitoPoolComponent', () => {
  let component: NewCognitoPoolComponent;
  let fixture: ComponentFixture<NewCognitoPoolComponent>;

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
        NewCognitoPoolComponent,
        FilterableTableComponent,
        TableActionsManagementComponent]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewCognitoPoolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
