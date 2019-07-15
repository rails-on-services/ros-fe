import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CognitoHomeComponent } from './cognito-home.component';
import { SharedModule } from 'src/shared/shared.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';

describe('CognitoHomeComponent', () => {
  let component: CognitoHomeComponent;
  let fixture: ComponentFixture<CognitoHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule,
        NoopAnimationsModule,
        HttpClientModule,
        RouterTestingModule
      ],
      declarations: [ CognitoHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CognitoHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
