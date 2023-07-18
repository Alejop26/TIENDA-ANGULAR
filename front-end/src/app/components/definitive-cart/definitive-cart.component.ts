import { Component } from '@angular/core';
import { CartProductComponent } from '../cart-product/cart-product.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from '../../services/products.service';
import { InventoryService } from '../../services/inventory.service';
import { HttpClient } from '@angular/common/http';



@Component({
  selector: 'app-definitive-cart',
  templateUrl: './definitive-cart.component.html',
  styleUrls: ['./definitive-cart.component.css']
})
export class DefinitiveCartComponent {
  carrito: any = [];
  userID: number;
  total: number = 0;
  url: string = "http://localhost:3000/api/";

  constructor(private route: ActivatedRoute, private productsService: ProductsService, private inventoryService: InventoryService, private router:Router, private http: HttpClient ) {}

  getUser() {
    const user = window.localStorage.getItem("userInformation");
    if (user != null && user != "") {
      console.log(user);
      const userInfo = JSON.parse(user);
      if (userInfo && userInfo.userID) { // Verifica si userInfo y userInfo.userID existen
        this.userID = userInfo.userID;
      } 
      } else {
        console.log("no user");
        this.router.navigate(['/login']);// Redirecciona a login
      }
    }

    getCart() {
      this.getUser();
      this.http.get(this.url + "cart/" + this.userID).subscribe((data: any) => {
        this.carrito = data;
      });
    }

    
}
