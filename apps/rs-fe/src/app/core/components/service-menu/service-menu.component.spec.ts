import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceMenuComponent } from './service-menu.component';
import { SharedModule } from 'src/shared/shared.module';
import { RouterTestingModule } from '@angular/router/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('ServiceMenuComponent', () => {
  let component: ServiceMenuComponent;
  let fixture: ComponentFixture<ServiceMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule, RouterTestingModule, NoopAnimationsModule],
      declarations: [ServiceMenuComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
