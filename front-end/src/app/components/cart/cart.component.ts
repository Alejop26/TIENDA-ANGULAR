import { Component } from '@angular/core';
import { Product } from './product.model';
import { HttpClient } from '@angular/common/http';

const API_BASE_URL = 'http://localhost:4200';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  pay:number = 100
  

  // constructor(private http: HttpClient) {}

  // //Obtener los elementos del carrito por ID usario (activos, inactivos, o cancelados)
  // getCartItemsByUserID(userID: number, status: 'active' | 'paid' | 'cancelled') {
  //   const url = `${API_BASE_URL}/cart/${userID}/${status}`;
  //   return this.http.get<any[]>(url);
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
