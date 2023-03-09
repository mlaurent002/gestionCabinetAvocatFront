import { Component, OnInit } from '@angular/core';
import { Affaire } from 'app/models/affaire';
import { AffaireService } from 'app/services/affaire.service';

@Component({
  selector: 'app-affaire',
  templateUrl: './affaire.component.html',
  styleUrls: ['./affaire.component.scss']
})
export class AffaireComponent implements OnInit {
  affaire: Affaire = new Affaire();

  affaires!: any[];

  //Recherche 1
  affairesRecherche: any;
  reference: string;

  constructor(private affaireService: AffaireService) { }

  ngOnInit(): void {
    //this.findAllAffaires();
    //Recherche 2
    this.reference = '';
    this.findByReference();
  }

  findAllAffaires() {
    this.affaireService.findAll().subscribe(data => { this.affaires = data; });
  }

  //Recherche 3
  findByReference() {
    this.affaireService.findByReference(this.reference).subscribe(data => { this.affairesRecherche = data; });
  }

  saveAffaire() {
    this.affaireService.save(this.affaire).subscribe(
      () => {
        this.findAllAffaires();
        this.affaire = new Affaire();
      });
  }

  deleteAffaire(id: number) {
    this.affaireService.delete(id).subscribe(() => { this.findAllAffaires(); });
  }
}
