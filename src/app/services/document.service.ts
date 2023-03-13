import { HttpClient, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Document } from 'app/models/document';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  private BASE_URL = "http://localhost:9090/documents";

  constructor(private httpClient: HttpClient) { }

  //findAll -> verbe http : GET --> url : BASE_URL
  public findAll(): Observable<any> {
    return this.httpClient.get(this.BASE_URL);
  }

  //save -> verbe http : POST --> url : BASE_URL + Body
  public save(documentFile: File, document?: Document): Observable<any> {
    const formData = new FormData();
    formData.append('dateCreation', document.dateCreation.toString());
    formData.append('nom', document.nom);
    formData.append('description', document.description);
    formData.append('documentFile', documentFile);
    const requestHttp = new HttpRequest('POST', this.BASE_URL, formData, {
      reportProgress: true, responseType: 'text'
    });
    return this.httpClient.request(requestHttp);
    //return this.httpClient.post(this.BASE_URL, document);
  }

  //delete --> verbe http : DELETE --> url : BASE_URL/id
  public delete(id: number): Observable<any> {
    return this.httpClient.delete(this.BASE_URL + "/" + id);
  }

  //findOne with id --> verbe http : GET --> ulr : BASE_URL/id
  public findOne(id: number): Observable<any> {
    return this.httpClient.get(this.BASE_URL + "/" + id);
  }

  //update --> verbe http : PUT --> url : BASE_URL/id et dans le body l'objet document
  public update(documentFile: File, document?: Document): Observable<any> {
    const formData = new FormData();
    formData.append('dateCreation', document.dateCreation.toString());
    formData.append('nom', document.nom);
    formData.append('description', document.description);
    formData.append('documentFile', documentFile);
    const requestHttp = new HttpRequest('PUT', this.BASE_URL + '/' + document.idDocument, formData, {
      reportProgress: true, responseType: 'text'
    });
    return this.httpClient.request(requestHttp);
    /*var documentJSON = JSON.parse(document);
    return this.httpClient.put(this.BASE_URL + '/' + documentJSON.idDocument, documentJSON);*/
  }
}
