import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Phase } from 'app/models/phase';
import { PhaseService } from 'app/services/phase.service';

@Component({
  selector: 'app-edit-phase',
  templateUrl: './edit-phase.component.html',
  styleUrls: ['./edit-phase.component.scss']
})
export class EditPhaseComponent implements OnInit {

  phase: Phase = new Phase();

  editForm!: FormGroup;

  constructor(private routeur: Router, private phaseService: PhaseService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    let currentPhase = localStorage.getItem("editPhaseId");
    if (!currentPhase) {
      alert("Invalid Action");
      this.routeur.navigate(["/phases"])
      return;
    }


    //création de données vide
    this.editForm = this.formBuilder.group({
      idPhase: [],
      nom: ['', Validators.required],
      dateDebut: ['', Validators.required],
      dateFin: ['', Validators.required],
      tache_fk: ['', Validators.required],

    })

    //On remplit les champs vides
    this.phaseService.findOne(+currentPhase).subscribe(data => { this.editForm.setValue(data); });
  }

  /*MAJ des données*/
  updatePhase() {
    let idTache = localStorage.getItem("tacheId");
    var phaseJson = JSON.stringify(this.editForm.value);
    this.phaseService.update(phaseJson).subscribe(() => { this.routeur.navigate(['/tache', idTache, 'phases']) });
  }


}
