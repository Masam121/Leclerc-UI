import { Component} from '@angular/core';
import { Router }            from '@angular/router';
import {CompleterService, CompleterData, CompleterItem} from 'ng2-completer';
import {TranslateService, LangChangeEvent} from '@ngx-translate/core';
import {Http} from '@angular/http';

import { ProjectNetflix } from '../shared/projectNetflix';
import {ProjectService} from "../services/project.service"

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent{
  public projectSAPId: number;
  public searchStr: string;
  public dataService: CompleterData;
  public selectedProject: ProjectNetflix;
  public searchData: ProjectNetflix[];
  public placeholder: string;
  public toggle: number;


  constructor(private router: Router,
              private completerService: CompleterService,
              private http:Http,
              private translate:TranslateService,
              private projectService: ProjectService,)
  {
    projectService.getProjects().subscribe(projects => {
      this.searchData = projects;
      this.dataService = completerService.local(this.searchData, 'projectName', 'projectName').descriptionField("projectSapId");
    })
    this.setLanguage();
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.setTranslation(event.lang);
    });
  }

  toggleModal(value : number) : void{
    if(this.toggle === value){
      this.toggle = 0;
    }
    else{
      this.toggle = 1;
    }
  }

  gotoDetail(): void {
    let link = ['/project', this.projectSAPId];
    this.router.navigate(link);
  }

  onSelect(selected: CompleterItem): void {
    this.projectSAPId = selected.originalObject.projectSapId;
    this.gotoDetail();
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
      this.placeholder = res.json().NavBar.search;
    });
  }
}
