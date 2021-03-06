import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { DismissibleContentComponent, TableActionsManagementComponent, FilterableTableComponent } from '@perx/open-ui-components';
import { CognitoAppsComponent } from './cognito-apps.component';
import { SharedModule } from 'src/shared/shared.module';

describe('CognitoAppsComponent', () => {
  let component: CognitoAppsComponent;
  let fixture: ComponentFixture<CognitoAppsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule,
        HttpClientModule,
        RouterTestingModule
      ],
      declarations: [
        DismissibleContentComponent,
        CognitoAppsComponent,
        FilterableTableComponent,
        TableActionsManagementComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CognitoAppsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
