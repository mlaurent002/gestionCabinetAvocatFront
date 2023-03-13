import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppService } from 'app/app.service';
import { Affaire } from 'app/models/affaire';
import { Document } from 'app/models/document';
import { AffaireService } from 'app/services/affaire.service';
import { DocumentService } from 'app/services/document.service';

@Component({
  selector: 'app-edit-affaire',
  templateUrl: './edit-affaire.component.html',
  styleUrls: ['./edit-affaire.component.scss']
})
export class EditAffaireComponent implements OnInit {

  affaire: Affaire = new Affaire();
  document: Document = new Document();
  documents!: Document[];
  currentAffaire!: any;
  hideFormAddDocument: boolean = true;
  hideFormEditDocumentv: boolean = true;
  currentFileUpload?: File = null;

  editFormAffaire!: FormGroup;
  editFormDocument!: FormGroup;

  constructor(private routeur: Router, private affaireService: AffaireService, private formBuilder: FormBuilder,
    private documentService: DocumentService, private appService: AppService, private router: Router) { }

  ngOnInit(): void {
    if (this.authenticated() === false) {
      this.router.navigateByUrl("/login")
    } else {
      let currentAffaire = localStorage.getItem("editAffaireId");
      if (!currentAffaire) {
        alert("Invalid Action");
        this.routeur.navigate(["/affaires"])
        return;
      }

      //création de données vide
      this.editFormAffaire = this.formBuilder.group({
        idAffaire: [],
        reference: ['', Validators.required],
        titre: ['', Validators.required],
        description: ['', Validators.required],
        statut: ['', Validators.required],
      })
      //On remplit les champs vides
      this.affaireService.findOne(+currentAffaire).subscribe(data => { this.editFormAffaire.setValue(data); });

      //création de données vide
      this.editFormDocument = this.formBuilder.group({
        idDocument: [],
        dateCreation: [],
        nom: ['', Validators.required],
        description: ['', Validators.required],
        documentFile: [],
        affaireFK: [],
      })
      this.affaire.idAffaire = +currentAffaire;
      this.findAllDocument()
    }
  }

  /*MAJ des données*/
  updateAffaire() {
    var affaireJson = JSON.stringify(this.editFormAffaire.value);
    this.affaireService.update(affaireJson).subscribe(() => { this.routeur.navigate(['/affaires']) });
  }

  // Document
  findAllDocument() {
    this.documentService.findAll().subscribe(data => {
      this.documents = data.filter(document => document.affaireFK.idAffaire == this.affaire.idAffaire);
    });
  }

  saveDocument() {
    this.document.dateCreation = new Date();
    this.document.affaireFK = this.affaire;
    this.documentService.save(this.currentFileUpload, this.document).subscribe(
      () => {
        //this.findAllAffaires();
        this.findAllDocument();
        this.document = new Document();
        this.hideFormDocument();
        this.currentFileUpload = null;
      });
  }

  deleteDocument(id: number) {
    this.documentService.delete(id).subscribe(() => { this.findAllDocument() });
  }

  editDocument(document: Document) {
    this.hideFormEditDocument(false)
    //création de données vide
    this.editFormDocument = this.formBuilder.group({
      idDocument: [],
      dateCreation: [new Date()],
      nom: ['', Validators.required],
      description: ['', Validators.required],
      affaireFK: [this.affaire],
      documentFile: []
    })
    //On remplit les champs vides
    this.documentService.findOne(document.idDocument).subscribe(data => { this.editFormDocument.setValue(data); });
  }

  selectFile(event: any) {
    this.currentFileUpload = event.target.files[0];
  }

  updateDocument() {
    this.editFormDocument.controls.documentFile.setValue(this.currentFileUpload);
    this.document.idDocument = this.editFormDocument.controls.idDocument.value;
    this.document.dateCreation = new Date();
    this.document.affaireFK = this.editFormDocument.controls.affaireFK.value;
    console.log(this.document);
    //var documentJson = JSON.stringify(this.editFormDocument.value);
    this.documentService.update(this.currentFileUpload, this.document).subscribe(() => {
      this.hideFormEditDocument(true)
      //this.routeur.navigate(['/affaires'])
      this.findAllDocument()
    });
  }

  hideFormDocument() {
    if (this.hideFormAddDocument === true) {
      this.hideFormAddDocument = false;
    } else {
      this.hideFormAddDocument = true;
    }
  }

  hideFormEditDocument(v?: boolean) {
    this.hideFormEditDocumentv = v;
  }

  // Authentification
  authenticated() {
    return this.appService.authenticated; // authenticated = false par défaut
  }

}
