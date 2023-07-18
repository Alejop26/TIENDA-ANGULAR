import { Component } from '@angular/core';
import {Router} from '@angular/router';


@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.css']
})
export class SuccessComponent {
  constructor( private router:Router){}

  inicio(){
    this.router.navigate(['/']);
  }
}
