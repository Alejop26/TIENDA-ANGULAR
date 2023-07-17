import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/components/login/auth-service.service'; 
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

interface User {
  username: string;
  password: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userData: User = {
    username: '',
    password: ''
  }
  
  apiUrl = "http://localhost:8080";
  loggedIn: boolean = false;
  adminMode: boolean = false;
  userId: string = "";

  constructor(private authService: AuthService, private http: HttpClient, private router: Router) {}

  onSubmit() {
    console.log(this.authService.login);
  }

  ngOnInit(): void {
    const status = window.localStorage.getItem("loggedIn");
    this.loggedIn = status === "true";
    window.localStorage.getItem("adminMode");
    window.localStorage.getItem("loggedIn");
  }

  submitLogin() {
    const getUsername = document.querySelector("#usernameInput") as HTMLInputElement;
    const getPassword = document.querySelector("#passwordInput") as HTMLInputElement;
    const username = getUsername.value;
    const password = getPassword.value;
    
    this.userData = {
      username: username,
      password: password
    };

    if (username == "adminMode" && password =="12345") {
      
      window.localStorage.setItem("adminMode", "true");
      this.loggedIn = true;
      window.localStorage.setItem("loggeddIn", "true");
      this.adminMode = true;
      
      this.userId = ""; // Reiniciar el valor de userId.
    } else {
    
      const status = window.localStorage.getItem("loggedIn");
    
      if (status == "false") {
        this.http.get(`${this.apiUrl}/api/users/username/${username}`).subscribe(response => {
          console.log(response); // Imprimir la respuesta del servidor
          this.loggedIn = true;
          window.localStorage.setItem("loggedIn", "true");
          //this.userId = response.userId; // Obtener el userId de la respuesta y asignarlo a userId
          let obj = JSON.stringify(response);
          this.userId = obj;
          console.log(this.userId)
          localStorage.setItem('obj', this.userId);
          
          setTimeout(() => {
            this.router.navigate(['/']);
          }, 2000);
        }, error => {
          console.error(error); // Manejo de errores
        });
      } else {
        const alert = document.querySelector(".statusAlert") as HTMLElement;
        alert.style.display= "flex";

        setTimeout(() => {
          alert.style.display= "none";
        }, 3000);
      }
    }
  }

  logOut() {
    const status = window.localStorage.getItem("loggedIn");
    if (status == "true") {
      window.localStorage.setItem("loggedIn", "false");
      console.log("Deslogueado");
      this.userId = ""; // Reiniciar el valor de userId
      setTimeout(() => {
        this.router.navigate(['/']);
      }, 1000);
      window.localStorage.setItem("adminMode", "false");
    }
  }
}
