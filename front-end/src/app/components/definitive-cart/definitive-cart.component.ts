import { Component } from '@angular/core';
import { CartProductComponent } from '../cart-product/cart-product.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from '../../services/products.service';
import { InventoryService } from '../../services/inventory.service';
import { HttpClient } from '@angular/common/http';



@Component({
  selector: 'app-definitive-cart',
  templateUrl: './definitive-cart.component.html',
  styleUrls: ['./definitive-cart.component.css']
})
export class DefinitiveCartComponent {
  carrito: any = [];
  total: number = 0;
  constructor(private route: ActivatedRoute, private productsService: ProductsService, private inventoryService: InventoryService, private router:Router, private http: HttpClient ) {}

  
}
