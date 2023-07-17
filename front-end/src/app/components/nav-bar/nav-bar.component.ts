import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service';


@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})

export class NavBarComponent implements OnInit {

  counter = 0;

  constructor(private router: Router, private cartService: CartService) { 
    const adminModeStatus = window.localStorage.getItem("adminMode");
    const loggedInStatus = window.localStorage.getItem("loggedIn");
    const userInformationStatus = window.localStorage.getItem("userInformation");
  }

  ngOnInit(): void {
    this.cartService.$miCarrito.subscribe((data) => {
      this.counter = this.cartService.obtenerTotalProductos();
    });

    this.handleTitleDisplay();
    window.addEventListener('resize', this.handleTitleDisplay);
  }

  handleTitleDisplay() {
    const titleElement = document.getElementById('title');
    if (titleElement) {
      if (window.innerWidth <= 600) {
        titleElement.style.whiteSpace = 'normal';
      } else {
        titleElement.style.whiteSpace = 'nowrap';
      }
    }
  }

  ngOnDestroy() {
    window.removeEventListener('resize', this.handleTitleDisplay);
  }



  //rutas para navegar entre componentes
  loginRoute() {
    this.router.navigate(['/login']);
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
      }, 1000);
      window.localStorage.setItem("adminMode", "false");
      const alert = document.querySelector(".logOutAlert") as HTMLElement;
      alert.style.display = "flex";

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


