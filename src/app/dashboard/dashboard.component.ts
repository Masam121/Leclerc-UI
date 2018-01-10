/**
 * Created by marcelsm on 2017-05-25.
 */
import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import {Http} from '@angular/http';
import {TranslateService, LangChangeEvent} from '@ngx-translate/core';

import { ProjectService } from '../services/project.service';
import { ProjectNetflix } from "../shared/projectNetflix";
import { CarouselInformation } from "../shared/carousel-information";
import {NotificationService} from "../services/notification.service";

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})

export class DashboardComponent implements OnInit {
  selectedProject : ProjectNetflix;
  projects : CarouselInformation[];
  employees : CarouselInformation[];

  constructor(
    public translate: TranslateService,
    private router: Router,
    private projectService: ProjectService,
    private http:Http
  ) {
    this.projects = [];
    this.employees = [];
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
    this.http.get('./assets/i18n/' + lang + '.json').subscribe(res => {
      for (let i = 0; i < this.projects.length; i++) {
        this.projects[i].rowTitle = res.json().DashBoardProjectsTitle[i];
      }
      for (let i = 0; i < this.employees.length; i++){
        this.employees[i].rowTitle = res.json().DashBoardEmployeesTitle[i];
      }
    });
  }

  getDashboardData() {
    this.projectService.getOverdueProject().subscribe(projects => {
      console.log(projects);

      var carInfo = new CarouselInformation();
      carInfo.rowProjects = projects;

      this.http.get('./assets/i18n/en.json').subscribe(res => {
        carInfo.rowTitle = res.json().DashBoardProjectsTitle[0];
        this.projects.push(carInfo)
      });
    });
    /*this.projectService.getExceedingBudgetProject().subscribe(projects => {
      var carInfo = new CarouselInformation();
      carInfo.rowProjects = projects;
      this.http.get('./assets/i18n/en.json').subscribe(res => {
        carInfo.rowTitle = res.json().DashBoardProjectsTitle[1];
        this.projects.push(carInfo)
      });
    });
    this.employeeService.getOverloadedProjectManager().subscribe(employees => {
      var carInfo = new CarouselInformation();
      carInfo.rowEmployee = employees;
      this.http.get('./assets/i18n/en.json').subscribe(res => {
        carInfo.rowTitle = res.json().DashBoardEmployeesTitle[0];
        this.employees.push(carInfo)
      });
    });*/
  }

  onSelect(project: ProjectNetflix): void {
    this.selectedProject = project;
    this.gotoDetail();
  }

  gotoDetail(): void{
    this.router.navigate(['/project', this.selectedProject.projectSapId]);
  }

  ngOnInit(): void {
    this.getDashboardData();
  }
}
