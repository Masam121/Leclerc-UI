/**
 * Created by marcelsm on 2017-05-29.
 */
import {Component, OnInit, ViewChild, AfterViewInit} from '@angular/core';
import {MatGridList} from "@angular/material";
import {TranslateService, LangChangeEvent} from '@ngx-translate/core';
import { Router } from '@angular/router';
import {Http} from '@angular/http';

import { ProjectService } from '../../services/project.service';
import { ProjectNetflix } from '../../shared/projectNetflix';
import { Facility } from '../../shared/facility';
import { OrganisationnalAxe } from '../../shared/organisationnalAxe'

@Component({
  selector: 'my-projectGrid',
  templateUrl: './project-grid.component.html',
  styleUrls: [ './project-grid.component.css' ],
})

export class ProjectGridComponent implements OnInit {
  @ViewChild(MatGridList) public grid: MatGridList;
  public colsNumber: number = 5;
  public selectedProject: ProjectNetflix;
  public myFilter1 : string;
  public myFilter2 : string;
  public myFilter3 : string;
  public sortings : OrganisationnalAxe[];
  public departments : string[];
  public facilities : Facility[];
  public tiles: ProjectNetflix[];

  constructor(
              public translate: TranslateService,
              private router: Router,
              private projectService: ProjectService,
              private http:Http)
  {
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.setTranslation(event.lang);
    });
  }

  filterProjects() : void {
    console.log(this.myFilter1 , this.myFilter2, this.myFilter3);
    this.projectService.getFilteredProjects(encodeURI(this.myFilter1), encodeURI(this.myFilter2), encodeURI(this.myFilter3))
      .subscribe(projects => this.tiles = projects);
  }

  onSelect(project: ProjectNetflix): void {
    this.selectedProject = project;
  }

  gotoDetail(): void{
    this.router.navigate(['/project', this.selectedProject.projectSapId]);
  }

  getProjects(): void {
   this.projectService.getProjects().subscribe(projects => {
     this.tiles = projects;
   })
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
    this.facilities = [];
    this.sortings = [];
    this.http.get('./assets/i18n/' + lang + '.json').subscribe(res => {
      res.json().Project.facilities.forEach((item, index) => {
        let fac = new Facility();
        fac.name = item;
        fac.value = res.json().Project.facilitiesValue[index];
        this.facilities.push(fac);
      });
      res.json().Project.sortings.forEach((item, index) => {
        let axe = new OrganisationnalAxe();
        axe.name = item;
        axe.value = res.json().Project.sortingsValues[index];
        this.sortings.push(axe);
      });
      this.departments = res.json().Project.departments;
    });
  }

  ngOnInit() {
    this.getProjects();
    this.facilities = [];
    this.sortings = [];
    this.setTranslation(this.translate.currentLang);
  }
}
