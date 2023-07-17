import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/components/login/auth-service.service'; 
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
//Importacion de paquetes.
//======================================================================================

//interfaz qie va a definir la estuctura de el formulario
interface User {
  username: string;
  password: string;
}
//Config.
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent{

  //Definimos un objero de tipo user
  userData: User = {
    username: '',
    password: ''
  }
  
  apiUrl = "http://localhost:8080"; //Ruta base de la api.

  //Constructor es una a funcion que se va a iniciar automaticamente en el momento que se utilice la clase.
  constructor(private authService: AuthService, private http: HttpClient, private router: Router) {
    window.localStorage.getItem("adminMode"); //Revisa el estado de la variable adminMode que esta dentro del localStorage.
    window.localStorage.getItem("loggedIn");  //Revisa el estado de la variable loggedIn que esta dentro del localStorage
    window.localStorage.getItem("userInformation"); //Revisa el estado de la variable userInformation que esta dentro del localStorage

  }

  //Funcion que maneja el  inicio de sesión, esta funcion se ejecutara en el momento en que le damos al boton "login".
  submitLogin() {
    //======================================================================================
    //En esta seccion de la funcion, guardamos el value de los inputs de nuestro formulario,  
    const getUsername = document.querySelector("#usernameInput") as HTMLInputElement;
    const getPassword = document.querySelector("#passwordInput") as HTMLInputElement;
    const username = getUsername.value; //Valor dentro del input de user.
    const password = getPassword.value; //Valor dentro del input de password.
  //======================================================================================
    
  //Le pasamos los valores que sacamos de los inputs a el objeto que declaramos al inicio de la clase.
    this.userData = {
      username: username,
      password: password
    };
    
    //Condicional que valida que los datos ingresados sean los datos del usuario unico adminMode.
    //Si no lo son, manda al servidor una peticion, la cual se encarga de buscar en la tabla de usuarios dentro
    //de la base de datos si el usuario ingresado está registrado.
    if (username == "adminMode" && password == "12345") {
      window.localStorage.setItem("loggedIn", "true");
      window.localStorage.setItem("adminMode", "true");
    } else {
      const status = window.localStorage.getItem("loggedIn");
      
      //Este condicional valida que el usuario no esta logueado, si no lo está
      //realiza la busqueda en la base de datos, si si está logueado salta un error.
      if (status == "false") {
         //Peticion al servidor que valida que el usuario esta registrado.
        this.http.get(`${this.apiUrl}/api/users/username/${username}`).subscribe(response => {
          //Condicion que valida que la peticion al servidor retorno algo diferente de NULL
          //si retornó NULL, salta un error, y si no, sigue adelante.
          if (response != null) {
            const user = response as User;
            if (user.password === password){ // Validar la contraseña
              window.localStorage.setItem("loggedIn", "true");
              window.localStorage.setItem("userInformation", JSON.stringify(response));
              //Redirecciona hacia el home 1 segundo despues de iniciar sesión.
              setTimeout(() => {
                this.router.navigate(['/']);
              }, 1000);

            } else {
              //En esta parte de la condicion, 
              const alert = document.querySelector(".incorrectPasswordAlert") as HTMLElement;
              alert.style.display = "flex";
              setTimeout(() => {
                alert.style.display = "none";
              }, 3000);
            }
          } else {
            const alert = document.querySelector(".nullAlert") as HTMLElement;
            alert.style.display = "flex";
            setTimeout(() => {
              alert.style.display = "none";
            }, 3000);
          }
        }, error => {
          console.error(error); // Manejo de errores
        });
      } else {
        const alert = document.querySelector(".statusAlert1") as HTMLElement;
        alert.style.display = "flex";
        setTimeout(() => {
          alert.style.display = "none";
        }, 3000);
      }
    }
  }

  //Funcion que cierra la sesion solo si hay una sesion iniciada anteriormente.
  logOut() {
    const status = window.localStorage.getItem("loggedIn");
    if (status == "true") {
  
      window.localStorage.setItem("loggedIn", "false");
      //Redirecciona hacia el home 1 segundo despues de cerrar sesión.
      setTimeout(() => {
        this.router.navigate(['/']);
      }, 1000);
      window.localStorage.setItem("adminMode", "false");
      window.localStorage.setItem("userInformation", "");
    }
    else{
      const alert = document.querySelector(".statusAlert2") as HTMLElement;
        alert.style.display = "flex";
        setTimeout(() => {
          alert.style.display = "none";
        }, 3000);
    }
  }
}
