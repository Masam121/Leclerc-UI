import { Component, OnInit , Input} from '@angular/core';

@Component({
  selector: 'app-employee-card',
  templateUrl: './employee-card.component.html',
  styleUrls: ['./employee-card.component.css']
})
export class EmployeeCardComponent implements OnInit {
  @Input() EmployeeImage: string;
  @Input() EmployeeDepartment: string;
  @Input() EmployeeName: string;
  @Input() EmployeeRole: string;
  @Input() EmployeeCapacity: number;
  DepartmentId : string;

  constructor() {}

  ngOnInit() {
    //this.DepartmentId = this.EmployeeDepartment.substring(0, 3);
  }
}
