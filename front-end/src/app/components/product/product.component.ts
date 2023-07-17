import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router'
import {ProductsService} from '../../services/products.service'

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})

export class ProductComponent implements OnInit {
  idProducto: number;
  producto: any = {};
  images: string[] = [];
  selectedImage: string;
  orderQuantity: number = 1;

  constructor(private route: ActivatedRoute, private productsService: ProductsService ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      console.log(params['id']);
      this.idProducto = parseInt(params['id'])
      this.cargarProducto()
    })
  }

  cargarProducto() {
    this.productsService.getOne(this.idProducto).subscribe(data => {
      this.producto = data;
      console.log(data)
      console.log(this.producto.productImages[0].imageURL)
      this.images = [this.producto.productImages[0].imageURL, this.producto.productImages[1].imageURL, this.producto.productImages[2].imageURL];
      this.selectedImage = this.images[0];
    })
  }

  changeImage(imageUrl: string): void {
    this.selectedImage = imageUrl;
  }

  comparationMaxAmount():boolean {
    // if (this.orderQuantity >= this.producto.stock)
    // {
    //   this.orderQuantity = this.producto.stock;
    //   return false;
    // }
    return false;
  };

  minAmountHandler():boolean {
    if(this.orderQuantity <= 1)
    {
      this.orderQuantity = 1;
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

  addToCart(): void {
  //   this.productsService.addToCart(this.idProducto, this.orderQuantity).subscribe(data => {
  //     console.log(data);
  //   })
    console.log("ordering ...", this.orderQuantity)
  }
}


        