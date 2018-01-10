import {Component} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {MatIconRegistry} from '@angular/material';

import {TranslateService} from '@ngx-translate/core';
import {ProjectService} from "./services/project.service";
import {EmployeeService} from "./services/employee.service";
import {NotificationService} from "./services/notification.service";
import {TaskService} from "./services/task.service";
import {DocumentService} from "./services/document.service";
import {MessageService} from "./services/messageService";
import {OutlookService} from "./services/outlook.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ProjectService, EmployeeService, NotificationService, TaskService, DocumentService, MessageService, OutlookService],
})
export class AppComponent{
  public myLanguage : string
  myLanguages = this.translate.getLangs();

  constructor(iconRegistry: MatIconRegistry,
              sanitizer: DomSanitizer,
              public translate: TranslateService) {

    translate.addLangs(['fr', 'en']);
    // this language will be used as a fallback when a translation isn't found in the current language
    translate.setDefaultLang('en');
    translate.langs;

    this.myLanguage = translate.getBrowserLang();
    let browserLang: string = translate.getBrowserLang();
    translate.use(browserLang.match(/en|fr/) ? browserLang : 'en');

    iconRegistry.addSvgIcon(
      'thumbs-up', sanitizer.bypassSecurityTrustResourceUrl("../assets/img/svg/thumbup-icon.svg"))
      .addSvgIcon(
        'thumbs-down', sanitizer.bypassSecurityTrustResourceUrl("../assets/img/svg/thumbdown-icon.svg"))
      .addSvgIcon(
        'thumbs-up-down', sanitizer.bypassSecurityTrustResourceUrl("../assets/img/svg/thumbupdown-icon.svg"))
  }

  switchLang() : void {
    this.changeLang(this.myLanguage);
  }

  changeLang(lang: string) {
    this.translate.use(lang);
  }
}
