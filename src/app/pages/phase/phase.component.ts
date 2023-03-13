import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from 'app/app.service';
import { Phase } from 'app/models/phase';
import { Tache } from 'app/models/tache';
import { PhaseService } from 'app/services/phase.service';
import { TacheService } from 'app/services/tache.service';

@Component({
  selector: 'app-phase',
  templateUrl: './phase.component.html',
  styleUrls: ['./phase.component.scss']
})
export class PhaseComponent implements OnInit {

  phase: Phase = new Phase();

  phases!: any[];

  //Récupération Tache 1
  tache: Tache = new Tache();
  idTache: any;


  constructor(private phaseService: PhaseService, private appService: AppService, private httpClient: HttpClient,
    private router: Router, private tacheService: TacheService) { }

  ngOnInit(): void {
    // non connecté
    if (this.authenticated() === false) {
      this.router.navigateByUrl("/login")
    } else {

      //Récupération Tache 3
      this.idTache = localStorage.getItem("tacheId");
      this.findTache(this.idTache);
      this.findAllPhases();
    }


  }

  //Récupération Tache 2
  findTache(id: number) {
    this.tacheService.findOne(id).subscribe(data => { this.tache = data; })
  }


  findAllPhases() {
    //this.phaseService.findAll().subscribe(data => { this.phases = data; });
    let idTache = localStorage.getItem("tacheId");
    this.phaseService.findAll().subscribe(
      data => {
        this.phases = data.filter(phase => phase.tache_fk.idTache == this.idTache);
      });
  }



  savePhase() {
    this.phase.tache_fk = this.tache;
    this.phaseService.save(this.phase).subscribe(
      () => {
        this.findAllPhases();
        this.phase = new Phase();
      });
  }

  /*deletePhase(id: number) {
    this.phaseService.delete(id).subscribe(() => { this.findAllPhases() });
  }

  editPhase(phase: Phase) {
    let idTache = localStorage.getItem("tacheId");
    console.log("idTache");
    console.log(idTache);
    localStorage.removeItem("editPhaseId");
    localStorage.setItem("editPhaseId", phase.idPhase.toString());
    this.router.navigate(['phases/editPhase', phase.idPhase]);
  }*/

  retourTaches() {
    this.router.navigate(['tache',]);
  }

  // Authentification
  authenticated() {
    return this.appService.authenticated; // authenticated = false par défaut
  }

}
