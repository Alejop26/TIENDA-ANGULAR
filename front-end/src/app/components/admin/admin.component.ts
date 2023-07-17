import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { InventoryService } from '../../services/inventory.service';

interface Product {
  productID: number;
  name: string;
  price: number;
  quantity: number;
  stockMin: number;
  stockMax: number;
  product: {
    price: number;
  }
}

interface Image {
  URL: string;
}

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  products: Product[] = [];
  images: Image[] = [];
  apiUrl = "http://localhost:8080/api";

  constructor(private http: HttpClient, private inventoryService: InventoryService) {}

  ngOnInit(): void {
    this.getProducts();
  }

// Tomar todos los productos

  getProducts() {
    this.inventoryService.getData().subscribe((data: Product[]) => {
      this.products = data;
      console.log(this.products)
      for (let index = 0; index < this.products.length; index++) {
        const element = this.products[index];
        this.http.get<Image>(`${this.apiUrl}/images/${element.productID}`).subscribe((data: any) => {
          this.images.push(data[0].imageURL);
          // console.log(this.images);
        })
      }
    });
  }
// ------------------------------------------------------------
  saveChanges(product: Product) {
    // Lógica para guardar los cambios del producto
    this.http.put<Product>(`${this.apiUrl}/inventory/product/${product.productID}`, product).subscribe((data: any) => {
      console.log(data);
    })
    console.log('Product Saved:', product);
  }

  deleteProduct(product: Product) {
    // Lógica para eliminar el producto
    console.log(product.productID);
    this.http.delete<Product>(`${this.apiUrl}/images/${product.productID}`).subscribe((data: any) => {
      console.log(data);
    });
    this.http.delete<Product>(`${this.apiUrl}/products/${product.productID}`).subscribe((data: any) => {
      console.log(data);
    });
    console.log('Product Deleted:', product);
  }

  addProduct(newProduct: Product) {
    // Lógica para agregar un nuevo producto
    console.log('New Product:', newProduct);
  }
}
