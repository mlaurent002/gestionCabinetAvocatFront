import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from 'app/app.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  constructor(private appService: AppService, private httpClient: HttpClient, private router: Router) { }

  ngOnInit(): void {
    if (this.authenticated() === false) {
      this.router.navigateByUrl("/login")
    }
  }

  logout() {
    this.appService.logout()
    //this.router.navigateByUrl("/dashboard") });
  }

  authenticated() {
    return this.appService.authenticated; // authenticated = false par défaut
  }

}
