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
  userData: User={
    username: '',
    password: ''
  }
  apiUrl = "http://localhost:8080";
  loggedIn: boolean = false;

  constructor(private authService: AuthService, private http: HttpClient, private router: Router) {}

  onSubmit() {
    console.log(this.authService.login);
  }

  ngOnInit(): void { }

  submitLogin() {
    const getUsername = document.querySelector("#usernameInput") as HTMLInputElement;
    const getPassword = document.querySelector("#passwordInput") as HTMLInputElement;
    const username = getUsername.value;
    const password = getPassword.value;
  
    this.userData = {
      username: username,
      password: password
    };
  
    this.http.get(`${this.apiUrl}/api/users/username/${username}`).subscribe(response => {
      console.log(response); // Imprimir la respuesta del servidor
      this.loggedIn = true;
      setTimeout(() => {
        this.router.navigate(['/']);
      }, 2000);
    }, error => {
      console.error(error); // Manejo de errores
    });
  }
}
