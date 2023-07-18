import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {ProductsService} from '../../services/products.service'
//Importacion de paquetes.
//===============================================================

//Config.
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent {

  constructor( private router:Router, private productsService: ProductsService) {
    //===============================================================================
    //En esta parte del codigo le asisgnamos valores a unas variables con las que tenemos en el localStorage.
    const adminModeStatus = window.localStorage.getItem("adminMode");
    const loggedInStatus = window.localStorage.getItem("loggedIn");
    const userInformationStatus = window.localStorage.getItem("userInformation");
    //===============================================================================
    //En estos condicionales validamos que no es la primera vez que un usuario
    //ingresa a la pagina e inicializa las variables en el localStorage,
    if (adminModeStatus === null) {
      window.localStorage.setItem("adminMode", "false");
    }

    if (loggedInStatus === null) {
      window.localStorage.setItem("loggedIn", "false");
    }

    if (userInformationStatus === null) {
      window.localStorage.setItem("userInformation", "");
    }
  }

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
