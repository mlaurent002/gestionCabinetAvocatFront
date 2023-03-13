import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Tache } from 'app/models/tache';
import { TacheService } from 'app/services/tache.service';

@Component({
  selector: 'app-edit-tache',
  templateUrl: './edit-tache.component.html',
  styleUrls: ['./edit-tache.component.scss']
})
export class EditTacheComponent implements OnInit {

  tache: Tache = new Tache();

  editForm!: FormGroup;
  currentId: string;

  constructor(private routeur: Router, private tacheService: TacheService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    let currentTache = localStorage.getItem("editTacheRef");
    this.currentId = localStorage.getItem("editTacheRef");

    if (!currentTache) {
      alert("Invalid Action");
      this.routeur.navigate(["/tache"])
      return;
    }

    //création de données vide
    this.editForm = this.formBuilder.group({
      idTache: [''],
      dateCreation: ['', Validators.required],
      titreTache: ['', Validators.required],
      descriptionTache: ['', Validators.required],
      statutAudience: ['', Validators.required],

    })

    //On remplit les champs vides
    this.tacheService.findOne(+this.currentId).subscribe(data => {
      console.log(data);
      this.editForm.setValue(data);
    });


  }

  /*MAJ des données*/
  updateTache() {
    var affaireJson = JSON.stringify(this.editForm.value);
    console.log(affaireJson);
    console.log(this.currentId);
    this.tacheService.update(affaireJson).subscribe(() => { this.routeur.navigate(['/tache']) });
  }

}
