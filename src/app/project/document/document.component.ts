import {Component, Input, OnInit} from '@angular/core';
import {DocumentService} from "../../services/document.service";
import {ActivatedRoute, Params} from "@angular/router";
import {ProjectDocument} from "../../shared/projectDocument";

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.css']
})
export class DocumentComponent implements OnInit {
  public Documents : ProjectDocument[];
  public description : string;
  public link : string;
  @Input() name : string;

  constructor(public documentService: DocumentService, public route: ActivatedRoute) {
  }

  public addDocument(): void{
    let doc = <ProjectDocument>{};
    doc.documentDescription = this.description;
    doc.documentLink =this.link;
    this.route.params.subscribe(params => {doc.projectId = +params['id']});

    this.documentService.postDocument(doc).subscribe(() => this.route.params.switchMap((params: Params) => this.documentService.getProjectDocuments(params['id'])).subscribe(document => {
      this.Documents = document;
    }));

    this.description = "";
    this.link = "";
  }

  public deleteDocument(doc : ProjectDocument): void{
    this.documentService.deleteDocument(doc).subscribe(() => this.route.params.switchMap((params: Params) => this.documentService.getProjectDocuments(params['id'])).subscribe(document => {
      this.Documents = document;
    }));
  }

  ngOnInit() {
    this.route.params.switchMap((params: Params) => this.documentService.getProjectDocuments(params['id'])).subscribe(document => {
      this.Documents = document;
    });
  }
}
