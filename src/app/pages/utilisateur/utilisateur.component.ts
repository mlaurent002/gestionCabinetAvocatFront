import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Utilisateur } from 'app/models/utilisateur';
import { RoleService } from 'app/services/role.service';
import { UtilisateurService } from 'app/services/utilisateur.service';
import { AppService } from 'app/app.service';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-utilisateur',
  templateUrl: './utilisateur.component.html'
})
export class UtilisateurComponent implements OnInit {

  users!: any[];
  roles!: any[];
  nomUtilisateurRecherche: any;
  nomUtilisateur: string;
  utilisateur: Utilisateur = new Utilisateur();

  constructor(private httpClient: HttpClient, private utilisateurService: UtilisateurService, private roleService: RoleService, private appService: AppService, private router: Router) {
  }

  ngOnInit(): void {
    this.nomUtilisateur = '';
    this.findByNomUtilisateur();
  }

  onSubmit() {
    this.findByNomUtilisateur();
  }

  /*findAllUtilisateurs() {
    this.utilisateurService.findAll().subscribe(data => { this.users = data; });
  }*/



  findAllRole() {
    this.roleService.findAll().subscribe(data => { this.roles = data; });
  }

  saveUtilisateur() {
    this.utilisateurService.save(this.utilisateur).subscribe(
      () => {
        //this.findAllUtilisateurs();
        this.findByNomUtilisateur;
        this.utilisateur = new Utilisateur();
      }
    )
  }
  deleteUtilisateur(id: number) {
    this.utilisateurService.delete(id).subscribe(
      () => {
        this.findByNomUtilisateur;
        //this.findAllUtilisateurs();
      }
    )
  }
  editUtilisateur(utilisateur: Utilisateur) {
    localStorage.removeItem("editUtilisateurId");
    localStorage.setItem("editUtilisateurId", utilisateur.idUtilisateur.toString());
    this.router.navigate(['/editUtilisateur', utilisateur.idUtilisateur]);
  }

  //Recherche ?
  findByNomUtilisateur() {
    this.utilisateurService.findByNomUtilisateur(this.nomUtilisateur).subscribe(data => { this.nomUtilisateurRecherche = data; });
  }
}