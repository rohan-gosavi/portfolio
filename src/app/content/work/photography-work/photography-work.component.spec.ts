import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotographyWorkComponent } from './photography-work.component';

describe('PhotographyWorkComponent', () => {
  let component: PhotographyWorkComponent;
  let fixture: ComponentFixture<PhotographyWorkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhotographyWorkComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PhotographyWorkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
