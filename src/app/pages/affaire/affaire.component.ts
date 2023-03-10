import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from 'app/app.service';
import { Affaire } from 'app/models/affaire';
import { AffaireService } from 'app/services/affaire.service';

@Component({
  selector: 'app-affaire',
  templateUrl: './affaire.component.html',
  styleUrls: ['./affaire.component.scss']
})
export class AffaireComponent implements OnInit {
  affaire: Affaire = new Affaire();

  affaires!: any[];

  //Recherche 2
  affairesRecherche: any;
  reference: string;

  constructor(private affaireService: AffaireService, private appService: AppService, private httpClient: HttpClient, private router: Router) { }

  ngOnInit(): void {
    // non connecté
    if (this.authenticated() === false) {
      this.router.navigateByUrl("/login")
    } else {
      //this.findAllAffaires();
      //Recherche 3
      this.reference = '';
      this.findByReference();
    }
  }
  //Recherche 6
  onSubmit() {
    this.findByReference();
  }

  //Recherche 5
  /*
  findAllAffaires() {
    this.affaireService.findAll().subscribe(data => { this.affaires = data; });
  }*/

  //Recherche 4
  findByReference() {
    this.affaireService.findByReference(this.reference).subscribe(data => { this.affairesRecherche = data; });
  }

  saveAffaire() {
    this.affaireService.save(this.affaire).subscribe(
      () => {
        //this.findAllAffaires();
        this.findByReference();
        this.affaire = new Affaire();
      });
  }

  deleteAffaire(id: number) {
    this.affaireService.delete(id).subscribe(() => { /*this.findAllAffaires()*/ this.findByReference(); });
  }

  editAffaire(affaire: Affaire) {
    localStorage.removeItem("editAffaireRef");
    localStorage.setItem("editAffaireRef", affaire.reference);
    this.router.navigate(['/editAffaire', affaire.reference]);
    console.log(affaire.reference)
  }

  // Authentification
  authenticated() {
    return this.appService.authenticated; // authenticated = false par défaut
  }

  //Affichage du statut en string
  convertStatusToString(status: number): string {
    switch (status) {
      case 0:
        return 'A venir';
      case 1:
        return 'En cours';
      case 2:
        return 'Archivé';
      default:
        return 'Inconnu';
    }
  }
}
