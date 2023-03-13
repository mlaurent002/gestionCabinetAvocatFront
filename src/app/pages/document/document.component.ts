import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from 'app/app.service';
import { Affaire } from 'app/models/affaire';
import { DocumentService } from 'app/services/document.service';

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.scss']
})
export class DocumentComponent implements OnInit {
  document: Document = new Document();
  idAffaire!: any;

  //Total documents
  documentsAll!: any[];
  documentsAllCount!: any;

  constructor(private documentService: DocumentService, private appService: AppService, private router: Router) { }

  ngOnInit() {
    // non connecté
    if (this.authenticated() === false) {
      this.router.navigateByUrl("/login")
    } else {
      this.findAllDocuments();
      this.idAffaire = localStorage.getItem("editAffaireId");
      console.log(this.idAffaire)
    }
  }

  //Total documents
  findAllDocuments() {
    this.documentService.findAll().subscribe(
      data => {
        this.documentsAll = data.filter(document => document.affaireFK.idAffaire === this.idAffaire);
        this.documentsAllCount = this.documentsAll.length;
      });
  }

  // Authentification
  authenticated() {
    return this.appService.authenticated; // authenticated = false par défaut
  }
}
