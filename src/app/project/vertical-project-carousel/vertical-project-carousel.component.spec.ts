import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerticalProjectCarouselComponent } from './vertical-project-carousel.component';

describe('VerticalProjectCarouselComponent', () => {
  let component: VerticalProjectCarouselComponent;
  let fixture: ComponentFixture<VerticalProjectCarouselComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerticalProjectCarouselComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerticalProjectCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
