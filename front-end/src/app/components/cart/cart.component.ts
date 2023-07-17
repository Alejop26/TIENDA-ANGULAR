import { Component } from '@angular/core';
import { Product } from './product.model';
import { HttpClient } from '@angular/common/http';

const API_BASE_URL:string = 'http://localhost:4200';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  pay:number = 100
  //ayudame a consumir esta api
  // constructor(private http: HttpClient) {}

  // // Obtener los elementos del carrito por ID de usuario (activos, inactivos o cancelados)
  // getCartItemsByUserID(userID: string, status: 'active' | 'inactive' | 'cancelled') {
  // const url = "${API_BASE_URL}/api/cart/user/${userID}/${status}";
  // return this.http.get<any[]>(url);
  // }

  // // Crear un nuevo elemento en el carrito
  // createCartItem(cartItemData: any) {
  //   const url = "${API_BASE_URL}/api/cart";
  //   return this.http.post(url, cartItemData);
  // }

  // // Cancelar un elemento en el carrito por su ID
  // cancelCartItem(cartID: string) {
  //   const url = "${API_BASE_URL}/api/cart/${cartID}/cancel";
  //   return this.http.put(url, null);
  // }

  // // Eliminar un elemento del carrito por su ID
  // deleteCartItem(cartID: string) {
  //   const url = "${API_BASE_URL}/api/cart/${cartID}";
  //   return this.http.delete(url);
  // }
  
  

  
    //tell me how to show the products
    products: Product[] = [
      {
        id: 1,
        name: 'Piedra caliza',
        price: 100,
        description: 'Piedra para construcción',
        order: 1,
        maxAmount: 30,
        image: 'https://www.gebr-pfeiffer.com/fileadmin/images/contentimages/Anwendungen/Teaser_large/Kalkstein.jpg'
      },
      {
        id: 2,
        name: 'Granito',
        price: 150,
        description: 'Piedra decorativa para interiores',
        order: 2,
        maxAmount: 100,
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Roca_Granito.JPG/220px-Roca_Granito.JPG'
      }
    ]

    
    

  handlePayment = () => {alert("Payment done!");}
}
