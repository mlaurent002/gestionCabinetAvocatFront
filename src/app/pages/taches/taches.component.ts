import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Tache } from 'app/models/tache';
import { TacheService } from 'app/services/tache.service';

@Component({
  selector: 'app-taches',
  templateUrl: './taches.component.html',
  styleUrls: ['./taches.component.scss']
})
export class TachesComponent implements OnInit {
  taches!: Tache[];
  tachesRecherche: Tache[]
  tache: Tache = new Tache();
  titretache!: String;

  constructor(private tacheService: TacheService, private httpClient: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.findAllTaches();
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
  findAllTaches() {
    //subsribe : utilisation de l'expression lambda
    //data -> {this.users = data}
    this.tacheService.findAll().subscribe(data => {
      this.taches = data
    })
  }
  deleteTache(idTache: number) {
    this.tacheService.delete(idTache).subscribe(() => {
      this.findAllTaches(); // Mettre à jour la liste
    });
  }
  onSubmit() {
    this.tachesRecherche = []
    this.taches.forEach(e => { if (e.titreTache == this.titretache) { console.log(this.taches); this.tachesRecherche.push(e) } })

  }

}
