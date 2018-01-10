import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkflowGraphComponent } from './workflow-graph.component';

describe('WorkflowGraphComponent', () => {
  let component: WorkflowGraphComponent;
  let fixture: ComponentFixture<WorkflowGraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkflowGraphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkflowGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
