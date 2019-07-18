import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewCognitoAppComponent } from './new-cognito-app.component';
import { SharedModule } from 'src/shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FilterableTableComponent, TableActionsManagementComponent } from '@perx/open-ui-components';

describe('NewCognitoAppComponent', () => {
  let component: NewCognitoAppComponent;
  let fixture: ComponentFixture<NewCognitoAppComponent>;

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
        NewCognitoAppComponent,
        FilterableTableComponent,
        TableActionsManagementComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewCognitoAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
