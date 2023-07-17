import { Component } from '@angular/core';
import { ApiService } from './service/api.service';
import {Router} from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent {

  constructor(private apiService: ApiService , private router:Router) {}

  data:any[] = [];

  ngOnInit(): void {
    this.llenarData();
  }

  llenarData(){
    this.apiService.getData().subscribe(data => {
      this.data = data;
      console.log(this.data);
    })
  }

  //Funcion encargada de que al ejecutarse con el evento click, redirija a la pagina de producto.
  viewProductPage(id: number){
    this.router.navigate([`/product/${id}`]);
  }

}