import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TacheService {

  private BASE_URL = "http://localhost:9090/TACHES";
  // HttpClient : un module qui nous permet d'utiliser les verbes http : GET, POST, PUT et DELETE
  constructor(private httpClient: HttpClient) { }
  // findAll --> verbe http : GET --> url : BASE_URL
  // Observable --> une méthode qui vérifie les données dans le serveur nodejs
  public findAll(): Observable<any> {
    return this.httpClient.get(this.BASE_URL);
    // Afficher la lise des users
  }
  // save --> verbe http : POST --> url : BASE_URL + Body
  public save(user: any): Observable<any> {
    console.log('Save service');
    return this.httpClient.post(this.BASE_URL, user);
  }
  // delete --> verbe http : DELETE --> url : BASE_URL/id
  public delete(id: number): Observable<any> {
    return this.httpClient.delete(this.BASE_URL + "/" + id);
  }
}
