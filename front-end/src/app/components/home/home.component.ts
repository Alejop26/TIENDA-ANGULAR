import { Component} from '@angular/core';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})



export class HomeComponent {

  //Inicializamos las variables que puedan utilizarse en el HTML
  protected idProduct: number;
  protected nameProduct: string;
  protected priceProduct: number;
  protected imageProduct: string;
  protected descriptionProduct: string;



  //Le damos valores a las variables
  constructor(){
    this.nameProduct="Pablo";
    this.idProduct = 1 
    this.priceProduct = 100;
    this.imageProduct = "../public/pablo.jpg";
    this.descriptionProduct = "Pablo es un perro muy jugueton y cariñoso, le encanta jugar con la pelota y que le rasquen la panza";

  }

}
