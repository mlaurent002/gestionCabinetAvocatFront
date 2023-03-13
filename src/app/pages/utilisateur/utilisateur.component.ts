import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Utilisateur } from 'app/models/utilisateur';
import { RoleService } from 'app/services/role.service';
import { UtilisateurService } from 'app/services/utilisateur.service';
import { AppService } from 'app/app.service';
import { HttpClient } from '@angular/common/http';
import { Role } from 'app/models/role';


@Component({
  selector: 'app-utilisateur',
  templateUrl: './utilisateur.component.html'
})
export class UtilisateurComponent implements OnInit {
  //role: Role = new Role();
  users!: any[];
  roles: Role[] = [];
  nomUtilisateurRecherche: any;
  nomUtilisateur: string;
  utilisateur: Utilisateur = new Utilisateur();

  constructor(private httpClient: HttpClient, private utilisateurService: UtilisateurService, private roleService: RoleService, private appService: AppService, private router: Router) {
  }

  ngOnInit(): void {

    // non connecté
    if (this.authenticated() === false) {
      this.router.navigateByUrl("/login")
    } else {
      this.nomUtilisateur = '';
      this.findByNomUtilisateur();
      this.findAllRole();
      this.roleService.getRoles().subscribe(
        (data: Role[]) => this.roles = data
      );
      this.saveUtilisateur();
    }
    this.findByNomUtilisateur();
    this.findAllRole();
    this.roleService.getRoles().subscribe(
      (data: Role[]) => this.roles = data
    );
    this.saveUtilisateur();
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
    if (this.nomUtilisateur == '') {
      this.utilisateurService.findAll().subscribe(data => { this.nomUtilisateurRecherche = data; });
    } else {
      this.utilisateurService.findAll().subscribe(
        data => {
          this.nomUtilisateurRecherche = data.filter(utilisateur => utilisateur.nomUtilisateur == this.nomUtilisateur);
        });
    }
  }

  // Authentification
  authenticated() {
    return this.appService.authenticated; // authenticated = false par défaut
  }
}