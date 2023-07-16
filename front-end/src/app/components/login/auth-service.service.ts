import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService{
  private apiUrl = '/api/login'; // Me falta sacar la URL correcta para el backend o consumo de API

  constructor(private http: HttpClient) {}

  login(username: string, password: string) {
    this.http.post<any>(this.apiUrl, { username, password }).subscribe( 
      response => {
        const token = response.token;
        // Guardar el token en el almacenamiento local o en una cookie si es necesario 
        console.log('Token:', token);
        // Me falta redirigir al usuario a la página principal, por ejemplo:
        // this.router.navigate(['/home']);
      },
      error => {
        console.error('Error:', error);
        // Mostrar un mensaje de error al usuario
      }
    );
  }
}

