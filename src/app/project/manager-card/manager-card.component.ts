import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-manager-card',
  templateUrl: './manager-card.component.html',
  styleUrls: ['./manager-card.component.css']
})
export class ManagerCardComponent implements OnInit {
  @Input() managerDepartment: string;
  @Input() managerName: string;
  @Input() managerPicture: string;
  @Input() managerId: number;
  departmentId: string;

  constructor() {

  }

  ngOnInit() {
    console.log(this.managerId);
    this.departmentId = this.managerDepartment.substring(0, 3);
    this.managerDepartment = this.managerDepartment.substring(4);
  }

}
