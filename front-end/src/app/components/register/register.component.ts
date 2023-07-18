import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

//Creamos la interfaz que va a ser la plantilla de nuestros usuarios.
interface User {
  username: string;
  email: string;
  password: string;
  fullName: string;
  phone: string;
  address: string;
}

//config.
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  apiUrl = "https://timeless-classics-server.onrender.com"; //Ruta base de la api

  //Definimosel objeto de tipo User.
  userData: User = {
    username: "",
    email: "",
    password: "",
    fullName: "",
    phone: "",
    address: ""
  }



  constructor(private http: HttpClient, private router: Router) {
    window.localStorage.getItem("adminMode"); //Revisa el estado de la variable adminMode que esta dentro del localStorage.
    window.localStorage.getItem("loggedIn");  //Revisa el estado de la variable loggedIn que esta dentro del localStorage
    window.localStorage.getItem("userInformation"); //Revisa el estado de la variable userInformation que esta dentro del localStorage
   }

   //De esta forma podemos llamar a userInformation desde cualquier parte del codigo.
   /*prb(){
    const prb = window.localStorage.getItem("userInformation");
    if(prb != null)
    {
      console.log(JSON.parse(prb));
    }
   }
   */
  
  //Función que maneja el registrar un usuario nuevo.
  submitRegister() {
    const loggedIn = window.localStorage.getItem("loggedIn");
    //Si hay una sesion activa no permitira registrar.
    if (loggedIn == "true"){
        const alert = document.querySelector(".statusAlert") as HTMLElement;
        alert.style.display= "flex";
        setTimeout(() => {
          alert.style.display= "none";
        }, 3000);
    }

    else {
      //======================================================================================
      //En esta seccion de la funcion, guardamos el value de los inputs de nuestro formulario,  
      const getUsername = document.querySelector("#usernameInput") as HTMLInputElement;
      const getEmail = document.querySelector("#emailInput") as HTMLInputElement;
      const getPassword = document.querySelector("#passwordInput") as HTMLInputElement;
      const getFullName = document.querySelector("#fullNameInput") as HTMLInputElement;
      const getPhone = document.querySelector("#phoneInput") as HTMLInputElement;
      const getAddress = document.querySelector("#addressInput") as HTMLInputElement;
      //======================================================================================

      //Valida que todos los elementos extraidos de los inputs sean diferentes de null.
      if (getUsername && getEmail && getPassword && getFullName && getPhone && getAddress) {
        const username = getUsername.value;
        const password = getPassword.value;
        const email = getEmail.value;
        const fullName = getFullName.value;
        const phone = getPhone.value;
        const address = getAddress.value;

        //Se crea un objeto que es el que se la va a pasar como cuerpo a la peticion
        this.userData = {
          username: username,
          email: email,
          password: password,
          fullName: fullName,
          phone: phone,
          address: address
        }

        //Peticion al servidor que registra un nuevo usuario en la base de datos.
        this.http.post(`${this.apiUrl}/api/users`, this.userData).subscribe(response => {
          this.router.navigate(['/login']); // Redirigir a la página de inicio de sesión
        }, error => {
          alert("Error al registrar usuario. \nRevise los campos ingresados")
        });
      }

    }
  }
}
