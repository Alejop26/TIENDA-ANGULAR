import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router'
import {ProductsService} from '../../../services/products.service'

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html', // Update this line
  styleUrls: ['./carousel.component.css']
})

export class CarouselComponent implements OnInit {
  idProducto = 0;
  producto: any = {}
  images: string[] = [];
  selectedImage: string;

  constructor(private route: ActivatedRoute, private productsService: ProductsService ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      console.log(params['id']);
      this.idProducto = parseInt(params['id'])
      this.uploadImages()
    })
  }

  uploadImages() {
    this.productsService.getOne(this.idProducto).subscribe(data => {
      this.producto = data;
    })
    this.images = [this.producto.productImages[0], this.producto.productImages[1], this.producto.productImages[2]];
    this.selectedImage = this.images[0];
  }

  changeImage(imageUrl: string): void {
    this.selectedImage = imageUrl;
  }
}