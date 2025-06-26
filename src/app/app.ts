import {CommonModule, DatePipe, DecimalPipe, JsonPipe, NgClass} from '@angular/common';
import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';

type Alert = {
  message: string;
  type: 'primary' | 'danger' | 'success';
}
type Coords = {
  x: number;
  y: number;
}

type Product = {
  id: number;
  name: string;
  cost: number;
}

type Section = 'home' | 'step1' | 'step2' | 'final'| null;

type MenuItem = {
  section: Section;
  label: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  template: `

    <div class="flex flex-col items-center justify-center p-8 gap-4">
      <h1>Welcome {{title}}!</h1>

      <div class="flex gap-2">
        <button class="btn" (click)="dec()">-</button>
        <button class="btn" (click)="inc()">+</button>
      </div>

      <img [src]="immagine" alt="" [width]="width">
      <div class="">
        <button class="btn" (click)="immagine='images/immagine1.jpeg'">1</button>
        <button class="btn" (click)="immagine='images/immagine2.jpeg'">2</button>
        <button class="btn" (click)="immagine='images/immagine3.jpeg'">3</button>
        <button class="btn" (click)="immagine='images/immagine4.jpeg'">4</button>
        <button class="btn" (click)="immagine='images/immagine5.jpeg'">5</button>
      </div>
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

    <div class="flex gap-3 items-center justify-center p-2 ">
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

    <div class="flex flex-row justify-center items-center">
      <div class="p-8 align-middle ">
        <p>Date1: {{today | date: 'gg-MM-yyyy'}}</p>
        <p>Date2: {{timestamp | date: 'hh:mm:ss'}}</p>
        <p>{{value | number: '1.2-3'}}</p>
        <pre>{{user | json}}</pre>
      </div>

      <div class="px-4">
        <li
          *ngFor="let product of products; let i = index;">
          {{i+1}} {{product.name}} {{product.cost | currency: 'EUR'}}
        </li>
      </div>
    </div>


    <div class="flex flex-col gap-4 p-4 m-8">
      <div class="flex justify-center gap-2 border-b-2 p-2">
        @for (item of menuItems; track item.section) {
          <button
            class="btn"
            (click)="section=item.section">
            {{item.label}}
          </button>
        }
      </div>

      @switch (section) {
        @case ('home') {
          Home
        }
        @case ('step1') {
          Step1
        }
        @case ('step2') {
          Step2
        }
        @case ('final') {
          Final
        }
        @default {
          Premi un bottone
        }
      }

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
  immagine = "images/immagine1.jpeg";
  width = 200;
  position : Coords | null = null;
  visible = true;
  section: Section = null;

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

  //Esempi di dati da convertire
  today = new Date();
  timestamp = 1702423006;
  value = 1.232848327489237
  user = { name: 'Fabio', surname: 'Biondi' }

  products: Product[] = [
    {id: 1, name: 'Chocolate', cost: 3},
    {id: 2, name: 'Milk', cost: 1},
    {id: 3, name: 'Biscuits', cost: 2},
    ]

  menuItems: MenuItem[] = [
    {section: 'home', label: 'Home'},
    {section: 'step1', label: 'Step1'},
    {section: 'step2', label: 'Step2'},
    {section: 'final', label: 'Final'},
  ]
}
