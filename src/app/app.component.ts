import { Component } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'starwars';
  public abaActive = false;
  constructor(private router: Router) {
  }

  toggleMenu(active) {
    this.abaActive = (active !== undefined ? active : true);
  }

  buscar(event) {
    let vroute = String(this.router.url).split('/')[1];
    //this.router.navigate(['/planetas/' + escape(event.target.value)]);
    this.router.navigate(['/' + vroute, escape(event.target.value)]);
  }
}