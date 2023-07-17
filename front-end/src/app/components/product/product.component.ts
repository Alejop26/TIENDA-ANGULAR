import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router'
import {ProductsService} from '../../services/products.service'

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})

export class ProductComponent implements OnInit {
  idProducto = 0;
  producto: any = {}

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
    })
  }
}


        