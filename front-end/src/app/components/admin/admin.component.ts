import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Product {
  name: string;
  price: number;
  stock: number;
  stockMin: number;
  stockMax: number;
}

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  products: Product[] = [];
  apiUrl = "http://localhost:8080/api/inventory";

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getProducts();
  }

// Tomar todos los productos

  getProducts() {
    this.http.get<Product[]>(this.apiUrl).subscribe(
      (response: Product[]) => {
        this.products = response;
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }
// ------------------------------------------------------------
  saveChanges(product: Product) {
    // Lógica para guardar los cambios del producto
    console.log('Product Saved:', product);
  }

  deleteProduct(product: Product) {
    // Lógica para eliminar el producto
    console.log('Product Deleted:', product);
  }

  addProduct(newProduct: Product) {
    // Lógica para agregar un nuevo producto
    console.log('New Product:', newProduct);
  }
}
