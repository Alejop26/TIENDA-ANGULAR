import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  image= "hola";
  name= "piedra caliza";
  price = "100";
  description= "piedra para construccion";
  order:number = 1;
  maxAmount= 45;

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

  ngOnInit() : void{
  }

  }
