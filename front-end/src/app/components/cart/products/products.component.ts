import { Component,Input, OnInit } from '@angular/core';
//import product.model.ts
import { Product } from '../product.model';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  @Input() product: Product;
  @Input() index: number;
//make the variables of product be defined by the variables of product.model.ts

  image: string;
  name: string= "piedra caliza";
  price: number = 100;
  description: string= "piedra para construccion";
  order:number = 1;
  maxAmount: number= 45;

  ngOnInit():void{
    if(this.product){
      this.image = this.product.image;
      this.name = this.product.name;
      this.price = this.product.price;
      this.description = this.product.description;
      this.order = this.product.order;
      this.maxAmount = this.product.maxAmount;
    }
  }

comparationMaxAmount():boolean { 
  if (this.order >= this.maxAmount)
  {
    this.order = 45;
    return false;
  }
  return true;
};

minAmountHandler():boolean {
  if(this.order <= 0)
  {
    this.order = 0;
    return false;
  }
  return true;
}
  
decreaseClickHandler()   {
    this.order--;
   
  }
increaseClickHandler()   {
    this.order++;
}
  constructor() {
}



  }
