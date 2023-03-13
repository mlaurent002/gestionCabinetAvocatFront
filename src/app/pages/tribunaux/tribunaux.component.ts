import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from 'app/app.service';
import { Tribunal } from 'app/models/tribunal';
import { TribunalService } from 'app/services/tribunal.service';

@Component({
  selector: 'app-tribunaux',
  templateUrl: './tribunaux.component.html',
  styleUrls: ['./tribunaux.component.scss']
})
export class TribunauxComponent implements OnInit {
  tribunal: Tribunal = new Tribunal();

  //Total tribunals
  tribunauxAll!: any[];
  tribunauxAllCount!: any;

  constructor(private tribunalService: TribunalService, private appService: AppService, private router: Router) { }

  ngOnInit() {
    // non connecté
    if (this.authenticated() === false) {
      this.router.navigateByUrl("/login")
    } else {
      this.findAllTribunals();
    }
  }

  //Total tribunals
  findAllTribunals() {
    this.tribunalService.findAll().subscribe(
      data => {
        this.tribunauxAll = data;
        this.tribunauxAllCount = this.tribunauxAll.length;
      });
  }

  // Authentification
  authenticated() {
    return this.appService.authenticated; // authenticated = false par défaut
  }
}
