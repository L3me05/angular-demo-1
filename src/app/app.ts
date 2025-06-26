import {NgClass} from '@angular/common';
import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
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
      class="alert m-6"
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

    <div class=" centered-page sm flex flex-col gap-3 border-1 rounded-2xl m-6 p-3">
      <input type="text" placeholder="URL"
             class="border-0 focus:outline-none focus:ring-0"
             (keydown.enter)="KeydownHandler()" #inputUrl>
    </div>

  `,
  styles: `
    h1{
      color: red;
    }

  `,

  styleUrl: './app.css'
})


export class App implements AfterViewInit{
  @ViewChild('inputUrl') inputUrl: ElementRef<HTMLInputElement> | undefined;
  protected title = 'Lemuel';
  immagine1 = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBjOPvLoIeIwnjqc-Lhfy_bvQy7s5rEU6ElA&s";
  width = 200;
  position : Coords | null = null;

  ngAfterViewInit():void {
    this.inputUrl?.nativeElement.focus();
  }

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

  KeydownHandler() {
    const text = this.inputUrl?.nativeElement.value;
    if(text) {
      const urlRegex = /^(https?|ftp):\/\/[^\s\/$.?#].\S*$/i;
      const isUrlValid = urlRegex.test(text);
      if(isUrlValid) {
        window.open(text);
      }

    }
  }
}
