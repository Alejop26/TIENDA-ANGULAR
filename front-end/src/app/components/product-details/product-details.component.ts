import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent {
  productId: number = 0;
  product: any = {};

  constructor(private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.productId = params['id'];
      this.getProductDetails();
    });
  }

  getProductDetails(): void {
    this.http.get<any>(`/api/products/${this.productId}`).subscribe(product => {
      this.product = product;
    });
  }

  addToCart(product: any): void {
    // Implement your add to cart logic here
  }

}
