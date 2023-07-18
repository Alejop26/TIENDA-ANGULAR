import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  //Creamos variable para almacenar la URL de la API
  private urlApi = "https://timeless-classics-server.onrender.com/api/products";

  constructor(private http: HttpClient) { }
//Creamos el método para obtener todos los productos
  public getData(): Observable<any>{
    return this.http.get<any>(this.urlApi);//Se usa el símbolo de dolar para concatenar el id
  }
//Creamos el método para obtener un producto por su id
  public getOne(id: number): Observable<any> {
    return this.http.get<any>(`${this.urlApi}/${id}`)//Se usa el símbolo de dolar para concatenar el id
  }
}
