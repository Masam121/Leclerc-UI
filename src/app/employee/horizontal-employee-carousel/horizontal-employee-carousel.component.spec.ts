import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HorizontalEmployeeCarouselComponent } from './horizontal-employee-carousel.component';

describe('HorizontalEmployeeCarouselComponent', () => {
  let component: HorizontalEmployeeCarouselComponent;
  let fixture: ComponentFixture<HorizontalEmployeeCarouselComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HorizontalEmployeeCarouselComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HorizontalEmployeeCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
