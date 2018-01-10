import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';

import { EmployeeService } from '../services/employee.service';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent{
  @Output() public ratioValue: EventEmitter<number> = new EventEmitter<number>();
  max = 100;
  min = 0;
  step = 1;
  thumbLabel = true;
  ratio : number;
  vertical = false;

  constructor(
    public route: ActivatedRoute,
    private employeeService: EmployeeService
  ) {
    this.route.params.switchMap((params: Params) => this.employeeService.getEmployeeRatio(+params['id'])).subscribe(
    res => this.ratio = res);
  }

  onInputChange(event : any){
  }

  onChange(event: any){
    this.route.params.switchMap((params: Params) => this.employeeService.postEmployeeRatio(+params['id'], this.ratio.toString())).subscribe(
      res => res);
    setTimeout(() => { this.ratioValue.emit(event.value); }, 300);
  }
}
