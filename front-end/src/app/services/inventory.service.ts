import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  //Creamos variable para almacenar la URL de la API que me devuelve el inventario
  private urlApi = "https://timeless-classics-server.onrender.com/api/inventory";

  constructor(private http: HttpClient) { }
//Creamos el método para obtener todos los productos
  public getData(): Observable<any>{
    return this.http.get<any>(this.urlApi);
  }
//  Creamos el método para obtener un producto por su id
  public getOne(id: number): Observable<any> {
    return this.http.get<any>(`${this.urlApi}/product/${id}`)
  }
}
