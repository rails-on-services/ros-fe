import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { SharedModule } from 'src/shared/shared.module';
import { RouterTestingModule } from '@angular/router/testing';
import { CORE_SERVICES_MENU, coreServicesMenuValue } from '../../core-services-menu.value';


describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule, RouterTestingModule],
      declarations: [HeaderComponent],
      providers: [{
        provide: CORE_SERVICES_MENU,
        useValue: coreServicesMenuValue
      }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

