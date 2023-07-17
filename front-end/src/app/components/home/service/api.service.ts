import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  //Creamos variable para almacenar la URL de la API
  private urlApi = "https://rickandmortyapi.com/api/character/1,183";

  constructor(private http: HttpClient) { }

  public getData(): Observable<any>{
    return this.http.get<any>(this.urlApi);
  }

}
