import {NgClass, NgStyle} from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NgClass, NgStyle],
  template: `
    <h1>Welcome {{title}}!</h1>

    <button (click)="dec()">-</button>
    <button (click)="inc()">+</button>
    <br>
    <img [src]="immagine1" alt="" [width]="width">

    <div class="alert"
       [ngClass]="{
        'alert-primary': alert.type === 'primary',
        'danger': alert.type === 'danger',
        'success': alert.type === 'success'
      }"
        [style.color]="alert.color"
        [style.font-size.em]="alert.fontSize"
         [ngStyle]="styles"
    >
      {{alert.message}}
    </div>

    <button (click)="alert = {type: 'primary', message: 'primary', color: 'yellow', fontSize: 1.5}; styles = {'text-align': 'left'}">Primary</button>
    <button (click)="alert = {type: 'danger', message:'ahia!', color: 'black', fontSize: 2 }; styles={'text-align': 'center'}">Danger</button>
    <button (click)="alert = {type: 'success', message:'ciao', color: 'white', fontSize: 2.5}; styles= {'text-align': 'right'}">Success</button>

  `,
  styles: `
    h1{
      color: red;
    }
  `,

  styleUrl: './app.css'
})


export class App {
  protected title = 'Lemuel';
  immagine1 = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBjOPvLoIeIwnjqc-Lhfy_bvQy7s5rEU6ElA&s";
  width = 200;

  styles = {
    'text-align': 'center'
  }

  alert = {
    type: 'primary',
    message: 'Ciao',
    color: 'white',
    fontSize: 1.5
  }

  dec() {
    if(this.width > 100) {
      this.width -= 50;
    }
  }

  inc() {
    if(this.width < 1000) {
      this.width += 50;
    }
  }

}
