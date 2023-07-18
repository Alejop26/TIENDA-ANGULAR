import { Component, ChangeDetectorRef } from '@angular/core';
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
  cart: any[] = [];
  userID: number;
  total: number = 0;
  url: string = "https://timeless-classics-server.onrender.com/api";
  user: any;
  paymentLink: string = "";

  constructor(private route: ActivatedRoute, private productsService: ProductsService, private inventoryService: InventoryService, private router:Router, private http: HttpClient, private cdr: ChangeDetectorRef) {
    this.getCart();
  }

  getUser() {
    const user = window.localStorage.getItem("userInformation");
    if (user != null && user != "") {
      console.log(user);
      const userInfo = JSON.parse(user);
      if (userInfo && userInfo.userID) { // Verifica si userInfo y userInfo.userID existen
        this.user = userInfo;
        this.userID = userInfo.userID;
        console.log("user id: " + this.userID);
      } 
      } else {
        console.log("no user");
        this.router.navigate(['/login']);// Redirecciona a login
      }
    }

  getCart() {
    this.getUser();
    this.http.get(this.url + "/cart/user/" + this.userID + "/active").subscribe((data: any) => {
      //console.log(data);
      this.cart = data;
      console.log(this.cart);
      console.log(this.cart[0].productImages[0].imageURL);
    });
  }

  addUnit(product: any){
    const body = {
      userID: this.userID,
      productID: product.productID,
      quantity: 1
    };

    this.http.post(this.url + '/cart', body).subscribe(
      (response) => {
        console.log(`Unidad de producto ${product.productID} añadida`, response);
        product.quantity++;
        // Realiza las acciones necesarias después de agregar el producto al carrito
      },
      (error) => {
        alert(`Error al añadir unidad de producto ${product.product.productName}, NO hay suficiente inventario`);
        // Maneja el error de acuerdo a tus necesidades
      }
    );

  }

  decreaseUnit(product: any){
    const body = {
      userID: this.userID,
      productID: product.productID,
      quantity: -1
    };

    this.http.post(this.url + '/cart', body).subscribe(
      (response) => {
        console.log(`Unidad de producto ${product.productID} disminuida`, response);
        product.quantity--;
        // Realiza las acciones necesarias después de agregar el producto al carrito
      },
      (error) => {
        alert(`Error al disminuir unidad de producto ${product.product.productName} no se pueden crear menos de 1 unidad`);
        // Maneja el error de acuerdo a tus necesidades
      }
    );

  }

deleteProduct(product: any){
  this.http.delete(this.url + '/cart/'+ product.cartID).subscribe(
    (response) => {
      this.cdr.detectChanges();
      console.log(`Producto ${product.productID} eliminado`, response);
      this.cart = this.cart.filter((item) => item.cartID !== product.cartID);
      // Realiza las acciones necesarias después de agregar el producto al carrito
    }
  );

  // this.location.reload();
}

calculateTotal(): number {
  let total = 0;
  this.cart.forEach(item => {
    const price = Number(item.product.price);
    const quantity = Number(item.quantity);
    if (!isNaN(price) && !isNaN(quantity)) {
      total += price * quantity;
    }
  });
  this.total = total;
  return total;
}

payment(){
  const data = {
    userID: this.userID,
    shippingAddress: this.user.address,
  }

  if (this.cart.length === 0 ){
    return alert("No hay productos en el carrito");
  }

  this.http.post(this.url + '/orders', data).subscribe(
    (response: any) => {
      console.log(`Orden creada`, response);
      this.paymentLink = response.url;
      window.open(this.paymentLink, '_self');
    },
    (error: any) => {
      alert(`Error al crear orden`);
      console.log(error);
    }

  )
}


}





