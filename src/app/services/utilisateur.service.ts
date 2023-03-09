import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class UtilisateurService {
  private BASE_URL = "http://localhost:9090/utilisateurs";
  constructor(private httpClient: HttpClient) { }

  public findAll(): Observable<any> {
    return this.httpClient.get(this.BASE_URL);
  }

  public save(utilisateur: any): Observable<any> {
    return this.httpClient.post(this.BASE_URL, utilisateur);
  }

  public delete(id: number): Observable<any> {
    return this.httpClient.delete(this.BASE_URL + "/" + id);
  }

  public findOne(id: number): Observable<any> {
    return this.httpClient.get(this.BASE_URL + '/' + id);
  }

  public update(utilisateur: any): Observable<any> {
    return this.httpClient.put(this.BASE_URL + "/" + utilisateur.idUtilisateur, utilisateur);
  }

}