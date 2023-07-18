import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})

export class NavBarComponent {

  constructor(private router: Router) { 
    const adminModeStatus = window.localStorage.getItem("adminMode");
    const loggedInStatus = window.localStorage.getItem("loggedIn");
    const userInformationStatus = window.localStorage.getItem("userInformation");
  }

  //rutas para navegar entre componentes
  loginRoute() {
    const adminModeStatus = window.localStorage.getItem("adminMode");
    const loggedInStatus = window.localStorage.getItem("loggedIn");

    if(adminModeStatus == "true"){
      this.router.navigate(['/admin']);
    }
    else if(loggedInStatus == "true" && adminModeStatus == "false"){
      this.router.navigate(['/home']);
    }
    else{
      this.router.navigate(['/login']);
    }
  }

  cartRoute() {
    this.router.navigate(['/cart']);
  }

  logOut() {
    const status = window.localStorage.getItem("loggedIn");
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
    } else {
      const alert = document.querySelector(".errorLogginOut") as HTMLElement;
      alert.style.display = "flex";

      setTimeout(() => {
        alert.style.display = "none";
      }, 1500);
    }
  }
}


