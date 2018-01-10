/**
 * Created by marcelsm on 2017-06-14.
 */
import {Component, OnInit, ViewChild} from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';
import {TranslateService, LangChangeEvent} from '@ngx-translate/core';
import {Http} from '@angular/http';

import { EmployeeService } from '../../services/employee.service';

import { EmployeeNetflixDetail } from '../../shared/employeeNetflixDetail';
import {ProjectNetflix} from "../../shared/projectNetflix";
import {ProjectService} from "../../services/project.service";
import {WorkflowGraphComponent} from "../workflow-graph/workflow-graph.component";

@Component({
  selector: 'my-employeeDetail',
  templateUrl: './employee-detail.component.html',
  styleUrls: [ './employee-detail.component.css' ],
})

export class EmployeeDetail implements OnInit{
  @ViewChild('graph')
  private child: WorkflowGraphComponent;
  public employee: EmployeeNetflixDetail;
  public carouselHeader: string;
  public departmentId: string;
  public employeeProjects: ProjectNetflix[];
  public filter: string = "";

  constructor(private employeeService: EmployeeService,
              private projectService: ProjectService,
              private translate: TranslateService,
              private http:Http,
              public route: ActivatedRoute) {
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.setTranslation(event.lang);
    });
  }

  public setLanguage(): void{
    let language;
    if(this.translate.currentLang !== null){
      language = this.translate.currentLang;
    }
    else{
      language = this.translate.getBrowserLang();
    }
    this.setTranslation(language);
  }

  public setTranslation(lang : string) : void{
    this.http.get('./assets/i18n/' + lang + '.json').subscribe(
      res => this.carouselHeader = res.json().EmployeeDetail.assignedProjects);
  }

  changedFilterEvent(event){
    console.log(event);
    this.filter = event;
  }

  changedRatioEvent(event){
    this.child.ngOnInit();
  }

  ngOnInit(){
    this.route.params.switchMap((params: Params) => this.employeeService.getEmployee(params['id'])).subscribe(
      employee => {
        console.log(employee);
        this.employee = employee;
        this.departmentId = employee.department.substring(0 , 3);
      });
    this.route.params.switchMap((params: Params) => this.projectService.getEmployeeProjects(params['id'])).subscribe(
      projects => {
        this.employeeProjects = projects;
      });
    this.setLanguage();
  }
}
