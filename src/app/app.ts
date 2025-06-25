import {NgClass, NgStyle} from '@angular/common';
import { Component } from '@angular/core';
type Alert = {
  message: string;
  type: 'primary' | 'danger' | 'success';
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NgClass, NgStyle],
  template: `
    <h1>Welcome {{title}}!</h1>

    <button class="btn" (click)="dec()">-</button>
    <button class="btn" (click)="inc()">+</button>
    <br>
    <img [src]="immagine1" alt="" [width]="width">

    <div
      class="alert"
      [ngClass]="{
        'alert-primary': alert.type === 'primary',
        'alert-danger': alert.type === 'danger',
        'alert-success': alert.type === 'success',
      }"
    >
      {{ alert.message }}
    </div>

    <div class="flex gap-3">
      <button
        class="btn"
        (click)="alert = {message: 'hello 1', type: 'primary'}"
      >primary</button>
      <button
        class="btn"
        (click)="alert = {message: 'hello 2', type: 'danger'}"
      >danger</button>
      <button
        class="btn"
        (click)="alert = {message: 'hello 3', type: 'success'}"
      >success</button>
    </div>

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


  alert : Alert = {
    type: 'primary',
    message: 'Ciao',
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
