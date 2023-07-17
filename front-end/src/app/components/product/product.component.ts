import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router'
import {ProductsService} from '../../services/products.service'
import { CarouselComponent } from './carousel/carousel.component';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})

export class ProductComponent implements OnInit {
  idProducto = 0;
  producto: any = {}
  images: string[] = [];
  selectedImage: string;

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
      this.images = [this.producto.productImages[0], this.producto.productImages[1], this.producto.productImages[2]];
      this.selectedImage = this.images[0];
    })
  }

  changeImage(imageUrl: string): void {
    this.selectedImage = imageUrl;
  }
}


        