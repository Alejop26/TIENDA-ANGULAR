import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { InventoryService } from '../../services/inventory.service';
import { response } from 'express';

interface Product {
  productID: number;
  name: string;
  quantity: number;
  stockMin: number;
  stockMax: number;
  product: {
    productID: number;
    productName: string;
    description: string;
    price: number;
  };
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
  panelOpenState: boolean = false;


  //create a new product
  productName: string;
  description: string;
  price: number;
  imageFile: File;


  showAdminPage: boolean = false;
  showErrorPage: boolean = true;

  adminData: {
    userID: number;
    email: string;
    password: string;
    phone: string;
    address: string;
  };

  constructor(private http: HttpClient, private inventoryService: InventoryService) {
    const adminMode = window.localStorage.getItem("adminMode");
    if (adminMode == "true") {
      this.showAdminPage = true;
      this.showErrorPage = false;
    }
  }

  ngOnInit(): void {
    const storage = window.localStorage.getItem('userInformation');
    storage ? this.adminData = JSON.parse(storage) : console.log('No data found');
    console.log(this.adminData);
    this.getProducts();
  }

  dataValidationMin0(data: number) {
    data < 0 ? data = 0 : data = data;
    return data;
  }

  getProducts() {
    this.inventoryService.getData().subscribe((data: Product[]) => {
      this.products = data;
      console.log(this.products);
      for (let index = 0; index < this.products.length; index++) {
        const element = this.products[index];
        this.http.get<Image>(`${this.apiUrl}/images/${element.productID}`).subscribe((data: any) => {
          this.images.push(data[0].imageURL);
        });
      }
    });
  }

  saveChanges(product: Product) {
    product.quantity = this.dataValidationMin0(product.quantity);
    product.stockMin = this.dataValidationMin0(product.stockMin);
    product.stockMax = this.dataValidationMin0(product.stockMax);
    product.product.price = this.dataValidationMin0(product.product.price);

    this.http.put<Product>(`${this.apiUrl}/inventory/product/${product.productID}`, product).subscribe((data: any) => {
      console.log(data);
    });
    this.http.put<Product>(`${this.apiUrl}/products/${product.product.productID}`, product.product).subscribe((data: any) => {
      console.log(data);
    });
    console.log('Producto guardado:', product);
  }

  deleteProduct(product: Product) {
    console.log(product.productID);
    this.http.delete<Product>(`${this.apiUrl}/images/${product.productID}`).subscribe((data: any) => {
      console.log(data);
    });
    this.http.delete<Product>(`${this.apiUrl}/products/${product.productID}`).subscribe((data: any) => {
      console.log(data);
    });
    console.log('Producto eliminado:', product);
  }

  addProduct() {
    const formData = new FormData();
    formData.append('productName', this.productName);
    formData.append('description', this.description);
    formData.append('price', this.price.toString());
    formData.append('image', this.imageFile);
    this.http.post(`${this.apiUrl}/products/`, formData).subscribe(
      (response) => {
        console.log("Producto creado:", response);
      },
      (error) => {
        console.error("Error creando producto:", error);
      }
    )

  }

  submitUpdateProfile() {
    this.http.put(`${this.apiUrl}/users/${this.adminData.userID}`, this.adminData).subscribe(
      (response) => {
        console.log(response);
        alert("Sus cambios han sido aplicados.");
      }
    );
  }
}
