import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Role } from 'app/models/role';
import { Utilisateur } from 'app/models/utilisateur';
import { RoleService } from 'app/services/role.service';
import { UtilisateurService } from 'app/services/utilisateur.service';

@Component({
  selector: 'app-edit-utilisateur',
  templateUrl: './edit-utilisateur.component.html',
})
export class EditUtilisateurComponent implements OnInit {

  utilisateur: Utilisateur = new Utilisateur();
  roles: Role[] = [];
  editForm!: FormGroup;

  constructor(private routeur: Router, private utilisateurService: UtilisateurService, private roleService: RoleService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    let currentUtilisateur = localStorage.getItem("editUtilisateurId");
    if (!currentUtilisateur) {
      alert("Invalid Action");
      this.routeur.navigate(["/utilisateur"])
      return;
    }



    //création de données vide
    this.editForm = this.formBuilder.group({
      idUtilisateur: [],
      nomUtilisateur: ['', Validators.required],
      prenomUtilisateur: ['', Validators.required],
      emailUtilisateur: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
      roles: ['', Validators.required],
    })

    //On remplit les champs vides
    this.utilisateurService.findOne(+currentUtilisateur).subscribe(data => { this.editForm.setValue(data); });
  }

  /*MAJ des données*/
  updateUtilisateur() {
    var utilisateurJson = JSON.stringify(this.editForm.value);
    this.utilisateurService.update(utilisateurJson).subscribe(() => { this.routeur.navigate(['/utilisateur']) });
  }

}