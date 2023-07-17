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

  constructor(private router: Router, private cartService: CartService) { }

  ngOnInit(): void {
    this.cartService.$miCarrito.subscribe((data) => {
      this.counter = this.cartService.obtenerTotalProductos();
    });
  }

  //rutas para navegar entre componentes
  loginRoute() {
    this.router.navigate(['/login']);
  }

  cartRoute() {
    this.router.navigate(['/cart']);
  }
}


