import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

//Creamos la interfaz que va a ser la plantilla de nuestros usuarios.
interface User {
  username: string;
  email: string;
  password: string;
  fullName: string;
  phone: string;
  address: string;
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  apiUrl = "http://localhost:8080";
  registered: boolean = false;

  userData: User = {
    username: "",
    email: "",
    password: "",
    fullName: "",
    phone: "",
    address: ""
  }
  constructor(private http: HttpClient, private router: Router) { }

  submitRegister() {
    const getUsername = document.querySelector("#usernameInput") as HTMLInputElement;
    const getEmail = document.querySelector("#emailInput") as HTMLInputElement;
    const getPassword = document.querySelector("#passwordInput") as HTMLInputElement;
    const getFullName = document.querySelector("#fullNameInput") as HTMLInputElement;
    const getPhone = document.querySelector("#phoneInput") as HTMLInputElement;
    const getAddress = document.querySelector("#addressInput") as HTMLInputElement;

    if (getUsername && getEmail && getPassword && getFullName && getPhone && getAddress) {
      const username = getUsername.value;
      const password = getPassword.value;
      const email = getEmail.value;
      const fullName = getFullName.value;
      const phone = getPhone.value;
      const address = getAddress.value;

      this.userData = {
        username: username,
        email: email,
        password: password,
        fullName: fullName,
        phone: phone,
        address: address
      }

      this.http.post(`${this.apiUrl}/api/users`, this.userData).subscribe(response => {
        console.log(response); // Imprimir la respuesta del servidor
        this.registered = true;
        this.router.navigate(['/login']); // Redirigir a la página de inicio de sesión
      }, error => {
        console.error(error); // Manejo de errores
      });
    }


  }
}
