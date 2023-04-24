import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SoftwareServicesComponent } from './software-services.component';

describe('SoftwareServicesComponent', () => {
  let component: SoftwareServicesComponent;
  let fixture: ComponentFixture<SoftwareServicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SoftwareServicesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SoftwareServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
