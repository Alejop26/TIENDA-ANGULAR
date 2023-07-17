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

  constructor(private authService: AuthService, private http: HttpClient, private router: Router) {
    const adminModeStatus = window.localStorage.getItem("adminMode");
    const loggedInStatus = window.localStorage.getItem("loggedIn");
    const userInformationStatus = window.localStorage.getItem("userInformation");

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
      window.localStorage.setItem("loggedIn", "true");
      window.localStorage.setItem("adminMode", "true");
    } else {
      const status = window.localStorage.getItem("loggedIn");
    
      if (status == "false") {
        this.http.get(`${this.apiUrl}/api/users/username/${username}`).subscribe(response => {            
          if(response != null){
            const user = response as User;
            if (user.password === password) {
              window.localStorage.setItem("loggedIn", "true");
              window.localStorage.setItem("userInformation", JSON.stringify(response));
              setTimeout(() => {
                this.router.navigate(['/'])});

            } else {
              const alert = document.querySelector(".nullAlert") as HTMLElement;
              alert.style.display= "flex";

              setTimeout(() => {
                alert.style.display= "none";
              }, 3000);
            }
          } else {
            const alert = document.querySelector(".nullAlert") as HTMLElement;
            alert.style.display= "flex";
            setTimeout(() => {
              alert.style.display= "none";
            }, 3000);
          }
          setTimeout(() => {
            //this.router.navigate(['/']);
          }, 2000);
        }, error => {
          console.error(error); // Manejo de errores
        });
      } else {
        const alert = document.querySelector(".statusAlert1") as HTMLElement;
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
      this.userId = "";
      setTimeout(() => {
        this.router.navigate(['/']);
        window.localStorage.setItem("userInformation", "");
      }, 1000);
      window.localStorage.setItem("adminMode", "false");
    } else {
      const alert = document.querySelector(".statusAlert2") as HTMLElement;
      alert.style.display = "flex";

      setTimeout(() => {
        alert.style.display = "none";
      }, 3000);
    }
  }
}
