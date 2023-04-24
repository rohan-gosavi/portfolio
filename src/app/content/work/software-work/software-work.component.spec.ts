import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SoftwareWorkComponent } from './software-work.component';

describe('SoftwareWorkComponent', () => {
  let component: SoftwareWorkComponent;
  let fixture: ComponentFixture<SoftwareWorkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SoftwareWorkComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SoftwareWorkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
