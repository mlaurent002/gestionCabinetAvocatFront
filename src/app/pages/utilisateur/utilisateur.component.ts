import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Utilisateur } from 'app/models/utilisateur';
import { RoleService } from 'app/services/role.service';
import { UtilisateurService } from 'app/services/utilisateur.service';
import { AppService } from 'app/app.service';

@Component({
  selector: 'app-utilisateur',
  templateUrl: './utilisateur.component.html'
})
export class UtilisateurComponent implements OnInit {

  users!: any[];
  roles!: any[];
  selectedFiles?: FileList;
  currentFileUpload?: File;
  utilisateur: Utilisateur = new Utilisateur();

  constructor(private utilisateurService: UtilisateurService, private roleService: RoleService, private appService: AppService, private router: Router) {
  }

  ngOnInit(): void {
  }

  findAllUtilisateurs() {
    this.utilisateurService.findAll().subscribe(data => { this.users = data; });
  }

  findAllRole() {
    this.roleService.findAll().subscribe(data => { this.roles = data; });
  }

  saveUtilisateur() {
    this.utilisateurService.save(this.utilisateur).subscribe(
      () => {
        this.findAllUtilisateurs();
        this.utilisateur = new Utilisateur();
      }
    )
  }
  deleteUtilisateur(id: number) {
    this.utilisateurService.delete(id).subscribe(
      () => {
        this.findAllUtilisateurs();
      }
    )
  }

  editUtilisateur(utilisateur: Utilisateur) {
    // localStorage : créer un attribut (name="editUserId") dans le navigateur et lui affecter une valeur (ediUserId= idUtilisateur) 
    // étape 1 : MAJ du composant 
    localStorage.removeItem("editUtilisateurId");
    // étape 2 : Séleectionner une ligne 
    localStorage.setItem("editUtilisateurId", utilisateur.idUtilisateur.toString());
    this.router.navigate(['/editUtilisateur', utilisateur.idUtilisateur]);
  }

  //Authenticated et authorities ? 
}