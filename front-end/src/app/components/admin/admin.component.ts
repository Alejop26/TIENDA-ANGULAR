import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { InventoryService } from '../../services/inventory.service';
import { response } from 'express';

interface Product {
  productID: number;
  name: string;
  price: number;
  quantity: number;
  stockMin: number;
  stockMax: number;
  product: {
    price: number;
  };
}

interface Image {
  URL: string;
}

interface newProduct {
  productID: number;

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

  adminData: {
    email: string;
    password: string;
    phone: string;
    address: string;
  } = {
    email: '',
    password: '',
    phone: '',
    address: '',
  };

  
  //create a new product
  productName: string;
  description: string;
  price: number;
  imageFile: File;
  
  
  showAdminPage:boolean = false;
  showErrorPage:boolean = true;

  
  constructor(private http: HttpClient, private inventoryService: InventoryService) {
    const adminMode = window.localStorage.getItem("adminMode");
    if(adminMode == "true"){
       this.showAdminPage = true;
       this.showErrorPage = false;
     }
  }

  ngOnInit(): void {
    this.getProducts();
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
    this.http.put<Product>(`${this.apiUrl}/inventory/product/${product.productID}`, product).subscribe((data: any) => {
      console.log(data);
    });
    console.log('Product Saved:', product);
  }

  deleteProduct(product: Product) {
    console.log(product.productID);
    this.http.delete<Product>(`${this.apiUrl}/images/${product.productID}`).subscribe((data: any) => {
      console.log(data);
    });
    this.http.delete<Product>(`${this.apiUrl}/products/${product.productID}`).subscribe((data: any) => {
      console.log(data);
    });
    console.log('Product Deleted:', product);
  }

  addProduct() {
    const formData = new FormData();
    formData.append('productName', this.productName);
    formData.append('description', this.description);
    formData.append('price', this.price.toString());
    formData.append('image', this.imageFile);
    this.http.post(`${this.apiUrl}/products/`, formData).subscribe(
      (response) => {
        console.log("Product created:", response);
      },
      (error) => {
        console.error("Error creting product:", error);
        
      }
    )
  }

  submitUpdateProfile() {
    console.log('Updating admin profile:', this.adminData);
  }
}
