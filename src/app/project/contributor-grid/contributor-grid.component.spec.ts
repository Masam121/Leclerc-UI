import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContributorGridComponent } from './contributor-grid.component';

describe('ContributorGridComponent', () => {
  let component: ContributorGridComponent;
  let fixture: ComponentFixture<ContributorGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContributorGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContributorGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
