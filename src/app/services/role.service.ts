import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Role } from 'app/models/role';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  private BASE_URL = "http://localhost:9090/roles"

  constructor(private httpClient: HttpClient) { }

  public findAll(): Observable<any> { return this.httpClient.get(this.BASE_URL); }

  public save(role: any): Observable<any> { return this.httpClient.post(this.BASE_URL, role); }

  public delete(id: number): Observable<any> { return this.httpClient.delete(this.BASE_URL + "/" + id); }

  public findOne(id: number): Observable<any> { return this.httpClient.get(this.BASE_URL + "/" + id); }

  public update(role: any): Observable<any> {
    var roleJSON = JSON.parse(role);
    return this.httpClient.put(this.BASE_URL + "/" + roleJSON.idrole, roleJSON);
  }
  public getRoles(): Observable<Role[]> {
    return this.httpClient.get<Role[]>(`${this.BASE_URL}/roles`);
  }
}