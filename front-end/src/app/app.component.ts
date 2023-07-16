import { Component } from '@angular/core';
import { CartService } from './services/cart.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'front-end';

  id=1;

  constructor(private cartService:CartService) {}

  holasoytemporal(){

    this.cartService.agregarCarrito({ id:this.id, Propiedad1: "valor1", Propiedad2: "valor2"});
    this.id++;
  }

  holasoytemporal2(){

    this.id--;
    this.cartService.eliminarCarrito(this.id);
  }



}
