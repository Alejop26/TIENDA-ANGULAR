import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router'
import {ProductsService} from '../../services/products.service'
import {InventoryService} from '../../services/inventory.service'
import {Router} from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})

export class ProductComponent implements OnInit {
  stock: number;
  idProducto: number;
  producto: any = {};
  images: string[] = [];
  selectedImage: string;
  orderQuantity: number = 0;
  inventory: any = {};

  constructor(private route: ActivatedRoute, private productsService: ProductsService, private inventoryService: InventoryService, private router:Router, private http: HttpClient) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      console.log(params['id']);
      this.idProducto = parseInt(params['id'])
      this.cargarProducto()
      this.sacarStock()
    })
  }

  cargarProducto() {
    this.productsService.getOne(this.idProducto).subscribe(data => {
      this.producto = data;
      console.log(data)
      console.log(this.producto.productImages[0].imageURL)
      try {
        this.images = [this.producto.productImages[0].imageURL, this.producto.productImages[1].imageURL, this.producto.productImages[2].imageURL];
      } catch (error) {
        this.images = [this.producto.productImages[0].imageURL, "none", "none"];
      }
      this.selectedImage = this.images[0];
    })
  }

  sacarStock(){
    this.inventoryService.getOne(this.idProducto).subscribe(data => {
      this.inventory = data;
      this.stock = this.inventory.quantity;
      // console.log(this.stock)
    })
  }

  changeImage(imageUrl: string): void {
    this.selectedImage = imageUrl;
  }

  comparationMaxAmount():boolean {
    if (this.orderQuantity >= this.stock)
    {
      this.orderQuantity = this.stock;
      return true;
    }
    return false;
  };

  minAmountHandler():boolean {
    if(this.orderQuantity <= 0)
    {
      this.orderQuantity = 0;
      return true;
    }
    return false;
  }
    
  decreaseClickHandler()   {
      this.orderQuantity--;
     
    }
  increaseClickHandler()   {
      this.orderQuantity++;
  }

  addToCart(userID: number): void {
  //   this.productsService.addToCart(this.idProducto, this.orderQuantity).subscribe(data => {
  //     console.log(data);
  //   })
    console.log("ordering ...", this.orderQuantity)
    //Hago solicitud para agregar producto al carrito del usuario
    const urladdtocart = `https://timeless-classics-server.onrender.com/api/cart/`; 
    const body = {
      userID: userID,
      productID: this.idProducto,
      quantity: this.orderQuantity
    };

    if (this.orderQuantity === 0) {
      alert("Error al agregar producto al carro de compras\nAgregue mínimo 1 en cantidad")
    } else {
      this.http.post(urladdtocart, body).subscribe(
        (response) => {
          console.log('Producto agregado al carrito:', response);
          alert("Producto agregado al carrito");
          // Realiza las acciones necesarias después de agregar el producto al carrito
        },
        (error) => {
          console.error('Error al agregar el producto al carrito:', error);
          // Maneja el error de acuerdo a tus necesidades
        }
      );
    }
  }



  getUser() {
    const user = window.localStorage.getItem("userInformation");
    if (user != null && user != "") {
      console.log(user);
      const userInfo = JSON.parse(user);
      if (userInfo && userInfo.userID) { // Verifica si userInfo y userInfo.userID existen
        this.addToCart(userInfo.userID);
      } 
      } else {
        console.log("no user");
        alert("Inicie sesión para agregar productos al carrito")
        this.router.navigate(['/login']);// Redirecciona a login
      }
    } 
  }

        