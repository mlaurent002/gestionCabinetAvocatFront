import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Affaire } from 'app/models/affaire';
import { Tache } from 'app/models/tache';
import { Tribunal } from 'app/models/tribunal';
import { Utilisateur } from 'app/models/utilisateur';
import { AffaireService } from 'app/services/affaire.service';
import { TacheService } from 'app/services/tache.service';
import { UtilisateurService } from 'app/services/utilisateur.service';
import { TribunalService } from 'app/services/tribunal.service';
@Component({
  selector: 'app-taches',
  templateUrl: './taches.component.html',
  styleUrls: ['./taches.component.scss']
})
export class TachesComponent implements OnInit {
  taches!: Tache[];
  tachesRecherche!: Tache[]
  tache: Tache = new Tache();
  titretache!: String;
  affaireFK2: Affaire = new Affaire();
  affaires!: Affaire[];
  utilisateur: Utilisateur = new Utilisateur();
  utilisateurs!: Utilisateur[];
  tribunalFK: Tribunal = new Tribunal();
  tribunaux!: Tribunal[];


  constructor(private tribunalService: TribunalService, private tacheService: TacheService, private utilisateurService: UtilisateurService, private affaireService: AffaireService, private httpClient: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.findAllTaches();
    this.findAllAffaire();
    this.findAllUtilisateur();
    this.tachesRecherche = [];
  }



  saveTache() {
    this.tacheService.save(this.tache).subscribe(
      () => {
        console.log("je suis save du composant")

        this.findAllTaches(); // Mettre à jour la liste des médicaments après l'ajout
        this.tache = new Tache(); // Vider le formulaire
        //this.notifications.showSuccess('Consultation saved successfully!');
      }
    );
  }
  submitTache() {
    this.tache.utilisateurFK = this.utilisateur;
    this.tache.affaireFK2 = this.affaireFK2;
    this.saveTache();
  }

  findAllTaches() {
    //subsribe : utilisation de l'expression lambda
    //data -> {this.users = data}
    this.tacheService.findAll().subscribe(data => {
      this.taches = data
    })

  }
  findAllAffaire() {
    //subsribe : utilisation de l'expression lambda
    //data -> {this.users = data}
    this.affaireService.findAll().subscribe(data => {
      this.affaires = data
    })

  }
  findAllUtilisateur() {
    //subsribe : utilisation de l'expression lambda
    //data -> {this.users = data}
    this.utilisateurService.findAll().subscribe(data => {
      this.utilisateurs = data
    })

  }
  deleteTache(idTache: number) {
    this.tacheService.delete(idTache).subscribe(() => {
      this.findAllTaches(); // Mettre à jour la liste
    });
  }
  editTache(idTache: number) {
    localStorage.removeItem("editTacheRef");
    localStorage.setItem("editTacheRef", idTache.toString());
    this.router.navigate(['/editTache', idTache]);
  }

  onSubmit() {
    this.tachesRecherche = []
    this.taches.forEach(e => { if (e.titreTache == this.titretache) { console.log(this.taches); this.tachesRecherche.push(e) } })

  }

  //Voir la liste des phases
  listPhase(idTache: number) {
    localStorage.removeItem("tacheId");
    localStorage.setItem("tacheId", idTache.toString());
    this.router.navigate(['/tache', idTache, 'phases']);

  }
}
