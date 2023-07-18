import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/components/login/auth-service.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

//Definimos la estructura con la que mandaremos el cuerpo de la petición.
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
export class LoginComponent implements OnInit {

  //Definimos el objeto de tipo User.
  userData: User = {
    username: '',
    password: ''
  }

  apiUrl = "https://timeless-classics-server.onrender.com"; //Ruta base de la api.

  //Función que corre en el momento en que se instancia la clase.
  constructor(private authService: AuthService, private http: HttpClient, private router: Router) {
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

  ngOnInit(): void {

  }

  //Función que maneja el inicio de sesión, la funcion se llama al momento de darle al boton de "Login"
  submitLogin() {

    const getUsername = document.querySelector("#usernameInput") as HTMLInputElement;
    const getPassword = document.querySelector("#passwordInput") as HTMLInputElement;
    const username = getUsername.value;
    const password = getPassword.value;
    //Usando quetySelectors, asignamos el valor dentro de los inputs a unas variables.
    //===============================================================================
    this.userData = {
      username: username,
      password: password
    };
    //Asignamos los valores al objeto que definimos al inicio de la clase.
    //===============================================================================
    const status = window.localStorage.getItem("loggedIn");//Ectraemos el estado del inicio de sesion desde el localStorage

    if (status == "false") {//Si el usuario no esta logueado 
      //Petición al servidor por medio de la api que se encarga de validar que el usuario ingresado
      //si se encuentre en la base de datos.
      this.http.get(`${this.apiUrl}/api/users/username/${username}`).subscribe(response => {
        if (response != null) {
          const user = response as User;

          if (user.password === password) {
            window.localStorage.setItem("loggedIn", "true");
            window.localStorage.setItem("userInformation", JSON.stringify(response));
            let route = '/';
            //En este condicional validamos que la contraseña ingresada por el usuario sea la
            //misma que la contraseña dentro del objeto usuario en la tabla users de la base de datos.
            //===============================================================================

            //Aqui hacemos un retraso en la aplicación, que lo que hace es redireccionarnos al home
            //pasado un segundo de la validación en la base de datos.
            setTimeout(() => {
              this.router.navigate([route])
            }, 1000);

            const prb = window.localStorage.getItem("userInformation");
            if(prb != null)
            {
              const parseData = JSON.parse(prb)
              
              if(parseData.role == "admin"){
                window.localStorage.setItem("adminMode", "true");
                route = '/admin';
              }
            }
                        
          } else {//Si el usuario habia iniciado sesión, no le permitira iniciar sesión
                  //y mostrara un mensaje en pantalla.
            const alert = document.querySelector(".nullAlert") as HTMLElement;
            alert.style.display = "flex";

            setTimeout(() => {
              alert.style.display = "none";
            }, 3000);
          }
        } else {//Si la respuesta del servidor fue igual a null por alguna razón,
                //muestra en pantalla un mensaje 
          const alert = document.querySelector(".nullAlert") as HTMLElement;
          alert.style.display = "flex";
          setTimeout(() => {
            alert.style.display = "none";
          }, 3000);
        }
      }, error => {
        console.error(error); // Manejo de errores
      });
    } else {//Si ya habia una sesion iniciada muestra un mensaje en pantalla.
      const alert = document.querySelector(".statusAlert1") as HTMLElement;
      alert.style.display = "flex";
      
      setTimeout(() => {
        alert.style.display = "none";
      }, 3000);
    }
  }
}
