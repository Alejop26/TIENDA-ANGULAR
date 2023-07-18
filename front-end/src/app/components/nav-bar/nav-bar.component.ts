import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})

export class NavBarComponent {

  //metodo que se llamara en el momento que se use la clase.
  constructor(private router: Router) { 
    const adminModeStatus = window.localStorage.getItem("adminMode");
    const loggedInStatus = window.localStorage.getItem("loggedIn");
    const userInformationStatus = window.localStorage.getItem("userInformation");
    //Creamos las variables en el localStorage.
  }

  //rutas para navegar entre componentes
  loginRoute() {
    const adminModeStatus = window.localStorage.getItem("adminMode");
    const loggedInStatus = window.localStorage.getItem("loggedIn");

    //Si el usuario admin inició sesion, el boton de login redirecciona a la interfaz de admin.
    if(adminModeStatus == "true"){
      this.router.navigate(['/admin']);
    }
    //Si inicia sesion cualquier usuario que no sea admin el boton de login redireccionara hacia la pagina de inicio.
    else if(loggedInStatus == "true" && adminModeStatus == "false"){
      this.router.navigate(['/home']);
    }
    //Si no hay ningun usuario en una sesión, el boton de login te rediccionara a la interfaz de inicio de sesión.
    else{
      this.router.navigate(['/login']);
    }
  }

  //Ruta a la que te va a redireccionar cuando le des al boton del carrito.
  cartRoute() {
    this.router.navigate(['/cart']);
  }

  //Función que maneja el boton de cerrar sesión, 
  logOut() {
    const status = window.localStorage.getItem("loggedIn");//Le asigna a una variable el estado de loggedIn.
    //Si El usuario esta iniciado sesión, la cierra y cambia el estado de loggedIn y de adminMode a false
    if (status == "true") {
      setTimeout(() => {
        window.localStorage.setItem("userInformation", "");
        window.localStorage.setItem("loggedIn", "false");
      }, 1500);
      window.localStorage.setItem("adminMode", "false");
      const alert = document.querySelector(".logOutAlert") as HTMLElement;
      alert.style.display = "flex";
      this.router.navigate(['/home']);
      setTimeout(() => {
        alert.style.display = "none";
      }, 1500);
    } //Si no hay una sesion iniciada no permitira cerrar una sesión.
    else {
      const alert = document.querySelector(".errorLogginOut") as HTMLElement;
      alert.style.display = "flex";

      setTimeout(() => {
        alert.style.display = "none";
      }, 1500);
    }
  }
}


