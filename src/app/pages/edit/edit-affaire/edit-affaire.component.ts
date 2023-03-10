import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Affaire } from 'app/models/affaire';
import { AffaireService } from 'app/services/affaire.service';

@Component({
  selector: 'app-edit-affaire',
  templateUrl: './edit-affaire.component.html',
  styleUrls: ['./edit-affaire.component.scss']
})
export class EditAffaireComponent implements OnInit {

  affaire: Affaire = new Affaire();

  editForm!: FormGroup;

  constructor(private routeur: Router, private affaireService: AffaireService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    let currentAffaire = localStorage.getItem("editAffaireRef");
    if (!currentAffaire) {
      alert("Invalid Action");
      this.routeur.navigate(["/affaire"])
      return;
    }

    //création de données vide
    this.editForm = this.formBuilder.group({
      idAffaire: [],
      reference: ['', Validators.required],
      titre: ['', Validators.required],
      description: ['', Validators.required],
      statut: ['', Validators.required],

    })

    //On remplit les champs vides
    this.affaireService.findByReference(currentAffaire).subscribe(data => { this.editForm.setValue(data); });
  }

  /*MAJ des données*/
  updateAffaire() {
    var affaireJson = JSON.stringify(this.editForm.value);
    this.affaireService.update(affaireJson).subscribe(() => { this.routeur.navigate(['/affaire']) });
  }

}
