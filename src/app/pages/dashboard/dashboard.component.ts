import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from 'app/app.service';
import { Affaire } from 'app/models/affaire';
import { AffaireService } from 'app/services/affaire.service';
import Chart from 'chart.js';


@Component({
  selector: 'dashboard-cmp',
  moduleId: module.id,
  templateUrl: 'dashboard.component.html'
})

export class DashboardComponent implements OnInit {

  affaire: Affaire = new Affaire();

  //Total affaires
  affairesAll!: any[];
  affairesAllCount!: any;

  //Affaires à venir
  affairesFuture!: any[];
  affairesFutureCount!: any;

  //Affaires en cours
  affairesCurrent!: any[];
  affairesCurrentCount!: any;

  //Affaires archivées
  affairesFinish!: any[];
  affairesFinishCount!: any;

  constructor(private affaireService: AffaireService, private appService: AppService, private router: Router) { }

  ngOnInit() {
    // non connecté
    if (this.authenticated() === false) {
      this.router.navigateByUrl("/login")
    } else {
      this.findAllAffaires();
      this.findAllAffairesFuture();
      this.findAllAffairesCurrent();
      this.findAllAffairesFinish();
    }
  }

  //Total affaires
  findAllAffaires() {
    this.affaireService.findAll().subscribe(
      data => {
        this.affairesAll = data;
        this.affairesAllCount = this.affairesAll.length;
      });
  }

  //Affaires à venir
  findAllAffairesFuture() {
    this.affaireService.findAll().subscribe(
      data => {
        this.affairesFuture = data.filter(affaire => affaire.statut === 0);
        this.affairesFutureCount = this.affairesFuture.length;
      });
  }

  //Affaires en cours
  findAllAffairesCurrent() {
    this.affaireService.findAll().subscribe(
      data => {
        this.affairesCurrent = data.filter(affaire => affaire.statut === 1);
        this.affairesCurrentCount = this.affairesCurrent.length;
      });
  }

  //Affaires archivées
  findAllAffairesFinish() {
    this.affaireService.findAll().subscribe(
      data => {
        this.affairesFinish = data.filter(affaire => affaire.statut === 2);
        this.affairesFinishCount = this.affairesFinish.length;
      });
  }

  // Authentification
  authenticated() {
    return this.appService.authenticated; // authenticated = false par défaut
  }
}
