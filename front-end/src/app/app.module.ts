import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatBadgeModule } from '@angular/material/badge';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { ProductComponent } from './components/product/product.component';
import { AdminComponent } from './components/admin/admin.component';
import { PaymentComponent } from './components/payment/payment.component';
import { RouterModule, Routes } from '@angular/router';
import { PayTestComponent } from './components/pay-test/pay-test.component';
import { MatAccordion, MatExpansionModule } from '@angular/material/expansion';
import { FooterComponent } from './components/footer/footer.component';
import { DefinitiveCartComponent } from './components/definitive-cart/definitive-cart.component';
import { CartProductComponent } from './components/cart-product/cart-product.component';
import { SuccessComponent } from './components/success/success.component';


const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'product/:id', component: ProductComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'payment', component: PaymentComponent },
  { path: 'cart', component: DefinitiveCartComponent },
  { path: 'paymentStatus/:userID',component: SuccessComponent },
  { path: '**', component: HomeComponent }, //Ruta no definida
]


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavBarComponent,
    RegisterComponent,
    HomeComponent,
    ProductComponent,
    AdminComponent,
    PaymentComponent,
    PayTestComponent,
    FooterComponent,
    DefinitiveCartComponent,
    CartProductComponent,
  ],
  imports: [
    AppRoutingModule,
    HttpClientModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatBadgeModule,
    RouterModule.forRoot(appRoutes),
    BrowserAnimationsModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatExpansionModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

