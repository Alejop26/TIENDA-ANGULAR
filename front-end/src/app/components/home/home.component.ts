import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {ProductsService} from '../../services/products.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent {

  constructor( private router:Router, private productsService: ProductsService) {}

  data:any[] = [];

  ngOnInit(): void {
    this.llenarData();
  }

  llenarData(){
    this.productsService.getData().subscribe(data => {
      this.data = data;
      console.log(this.data);
    })
  }

  //Funcion encargada de que al ejecutarse con el evento click, redirija a la pagina de producto.
  viewProductPage(id: number){
    this.router.navigate([`/product/${id}`]);
  }

}