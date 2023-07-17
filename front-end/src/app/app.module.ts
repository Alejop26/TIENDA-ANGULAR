import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { LoginComponent } from './components/login/login.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { RegisterComponent } from './components/register/register.component';
import { CartComponent } from './components/cart/cart.component';
import { HomeComponent } from './components/home/home.component';
import { ProductComponent } from './components/product/product.component';
import { AdminComponent } from './components/admin/admin.component';
import { PaymentComponent } from './components/payment/payment.component';
import { RouterModule, Routes } from '@angular/router';

// Importar el modulo para hacer peticiones HTTP

const appRoutes:Routes = [
  {path: '', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'product/:id', component: ProductComponent},
  {path: 'admin', component: AdminComponent},
  {path: 'payment', component: PaymentComponent},
  {path: 'cart', component: CarComponent},
  {path: '**', component: HomeComponent} //Ruta no definida
]
import { ProductsComponent } from './components/cart/products/products.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavBarComponent,
    RegisterComponent,
    CartComponent,
    HomeComponent,
    ProductComponent,
    AdminComponent,
    PaymentComponent,
    ProductsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

