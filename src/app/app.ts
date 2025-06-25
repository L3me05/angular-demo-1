import {NgClass, NgStyle} from '@angular/common';
import { Component } from '@angular/core';
type Alert = {
  message: string;
  type: 'primary' | 'danger' | 'success';
}
type Coords = {
  x: number;
  y: number;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NgClass],
  template: `

    <div class="flex flex-col items-center justify-center p-8 gap-4">
      <h1>Welcome {{title}}!</h1>

      <div class="flex gap-2">
        <button class="btn" (click)="dec()">-</button>
        <button class="btn" (click)="inc()">+</button>
      </div>

      <img [src]="immagine1" alt="" [width]="width">
    </div>

    <div
      class="alert"
      [ngClass]="{
        'alert-info': alert.type === 'primary',
        'alert-error': alert.type === 'danger',
        'alert-success': alert.type === 'success',
      }"
      (mousemove)="show($event)"
      (mouseout)="hide()"
    >
      {{ alert.message }}
    </div>

    <div class="flex gap-3 items-center justify-center p-2">
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
      <div class="ml-20">{{position?.x}} - {{position?.y}}</div>
    </div>

    <div class="absolute bg-gray-700 text-white p-3 rounded-3xl text-xs"
    [style.left.px]="position?.x"
    [style.top.px]="position?.y"
    [hidden]="!position">

      Tooltip
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


  position : Coords | null = null;


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
  show(event: MouseEvent) {
    this.position = {
      x: event.clientX+10,
      y: event.clientY+20
    }
  }

  hide() {
    this.position = null;
  }

}
