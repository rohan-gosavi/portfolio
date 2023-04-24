import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotographyServicesComponent } from './photography-services.component';

describe('PhotographyServicesComponent', () => {
  let component: PhotographyServicesComponent;
  let fixture: ComponentFixture<PhotographyServicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhotographyServicesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PhotographyServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
