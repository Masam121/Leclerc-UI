import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeWorkloadDataTableComponent } from './employee-workload-data-table.component';

describe('EmployeeWorkloadDataTableComponent', () => {
  let component: EmployeeWorkloadDataTableComponent;
  let fixture: ComponentFixture<EmployeeWorkloadDataTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeWorkloadDataTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeWorkloadDataTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
