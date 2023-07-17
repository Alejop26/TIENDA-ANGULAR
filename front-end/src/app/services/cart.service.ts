import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs'; // libreria para poder compartir la información entre componentes, peticiones 

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private listaCompras: any[] = [];
  private miCarrito = new BehaviorSubject<any>([]);

  $miCarrito = this.miCarrito.asObservable(); //evento que se va a disparar cuando se agregue un producto al carrito

  constructor() { }

  agregarCarrito(producto: any) {
    this.listaCompras.push(producto);
    this.miCarrito.next(this.listaCompras); //disparar el evento
  }

  eliminarCarrito(productoId: number) {
    this.listaCompras = this.listaCompras.filter(producto => producto.id !== productoId);
    this.miCarrito.next(this.listaCompras);
  }

  obtenerTotalProductos() {
    return this.listaCompras.length;
  }

  obtenerListaCompras() {
    return this.listaCompras;
  }

}
