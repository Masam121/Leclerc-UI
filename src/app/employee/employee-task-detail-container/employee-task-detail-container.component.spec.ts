import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeTaskDetailContainerComponent } from './employee-task-detail-container.component';

describe('EmployeeTaskDetailContainerComponent', () => {
  let component: EmployeeTaskDetailContainerComponent;
  let fixture: ComponentFixture<EmployeeTaskDetailContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeTaskDetailContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeTaskDetailContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
