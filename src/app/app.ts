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

type Todo = {
  id: number;
  title: string;
  done: boolean;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  template: `

    <div class="flex flex-col items-center justify-center p-8 gap-4">
      <h1>Welcome {{title}}!</h1>

<!--      zoom immagine-->
      <div class="flex gap-2">
        <button class="btn" (click)="dec()">-</button>
        <button class="btn" (click)="inc()">+</button>
      </div>

<!--      contenitore immagini 1-->
      <img [src]="immagine" alt="" [width]="width">
      <div class="">
        <button class="btn" (click)="immagine='images/immagine1.jpeg'">1</button>
        <button class="btn" (click)="immagine='images/immagine2.jpeg'">2</button>
        <button class="btn" (click)="immagine='images/immagine3.jpeg'">3</button>
        <button class="btn" (click)="immagine='images/immagine4.jpeg'">4</button>
        <button class="btn" (click)="immagine='images/immagine5.jpeg'">5</button>
      </div>
    </div>

<!--    slider immagini-->
    <div class="flex flex-col gap-3 items-center">
      <h1>{{carusel.name}} {{carusel.images[currentIndex].label}}</h1>

      <div class="flex gap-3 items-center">
        <button class="btn" (click)="prev()">Prev</button>
        <img [src]="carusel.images[currentIndex].path"
             [alt]="carusel.images[currentIndex].label">
        <button class="btn" (click)="next()">Next</button>
      </div>
    </div>


<!--    alert che cambia-->
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

<!--    pulsanti per far cambiare alert-->
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

<!--    tooltip-->
    <div class="absolute bg-gray-700 text-white p-3 rounded-3xl text-xs"
    [style.left.px]="position?.x"
    [style.top.px]="position?.y"
    [hidden]="!position">

      Tooltip
    </div>

<!--    campo input che rimanda a un preciso url-->
    <div class=" centered-page sm flex flex-col gap-3 border-1 rounded-2xl m-6 p-3">
      <input type="text" placeholder="URL"
             class="border-0 focus:outline-none focus:ring-0"
             (keydown.enter)="KeydownHandler()" #inputUrl>
    </div>

<!--    far vedere formattazione con pippe-->
    <div class="flex flex-row justify-center items-center">
      <div class="p-8 align-middle ">
        <p>Date1: {{today | date: 'gg-MM-yyyy'}}</p>
        <p>Date2: {{timestamp | date: 'hh:mm:ss'}}</p>
        <p>{{value | number: '1.2-3'}}</p>
        <pre>{{user | json}}</pre>
      </div>
<!--      //lista con ciclo for-->
      <div class="px-4">
        <li
          *ngFor="let product of products; let i = index;">
          {{i+1}} {{product.name}} {{product.cost | currency: 'EUR'}}
        </li>
      </div>
    </div>


<!--    menù interattivo-->
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

<!--    ToDoList -->
    <div class="flex flex-col gap-8 p-6 justify-center items-center">
      <h1>ToDoList</h1>
      <input
        type="text"
        class="input input-bordered"
        placeholder="Add new todo"
        (keydown.enter)="addTodo(input)"
        #input
      >

      <div class="flex flex-col gap-3">
        @for (todo of todos; track todo.id) {
          <div
            class="flex items-center"
            [ngClass]="{
                'line-through' : todo.done
            }"
          >
            <input
              type="checkbox"
              class="checkbox mr-2"
              [checked]="todo.done"
              (change)="toggleTodo(todo.id)"

            >
            {{ todo.title }}

            <button class="btn ml-6 " (click)="removeTodo(todo.id)">Remove</button>
          </div>
        }
      </div>


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
  title = 'Lemuel';
  immagine = "images/immagine1.jpeg";
  width = 200;
  position : Coords | null = null;
  visible = true;
  section: Section = null;
  currentIndex=0;
  carusel = {
    name: "immagineeee numero:",
    images: [
      { path:'images/immagine1.jpeg', label: 'immagine1' },
      { path:'images/immagine2.jpeg', label: 'immagine2' },
      { path:'images/immagine3.jpeg', label: 'immagine3' },
      { path:'images/immagine4.jpeg', label: 'immagine4' },
      { path:'images/immagine5.jpeg', label: 'immagine5' },
      ]
  }

  prev() {
    this.currentIndex = this.currentIndex > 0 ?
      this.currentIndex - 1 : this.carusel.images.length - 1;
  }

  next() {
    this.currentIndex = this.currentIndex < this.carusel.images.length - 1 ?
      this.currentIndex + 1 : 0;
  }

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

  //ToDoList
  todos : Todo[] = [
    {id: 1, title: 'Buy milk', done: false},
    {id: 2, title: 'Buy chocolate', done: true},
    {id: 3, title: 'Buy biscuits', done: false},
  ]

  removeTodo(id: number) {
    // const index = this.todos.findIndex(todo => todo.id === id);
    // this.todos.splice(index, 1)
    this.todos = this.todos.filter(todo => todo.id !== id);
  }

  toggleTodo(id: number) {
    // const index = this.todos.findIndex(todo => todo.id === id);
    // this.todos[index].done = !this.todos[index].done;
    this.todos = this.todos.map( todo  => {
      return todo.id === id ? {...todo, done: !todo.done} : todo;
    })
    console.log(this.todos);
  }

  addTodo(input: HTMLInputElement) {
    if (!input.value) {
      return;
    }
    const newTodo : Todo = {
      id: Date.now(),
      title: input.value,
      done: false
    }
    // this.todos.push(newTodo);
    this.todos = [...this.todos, newTodo];
    input.value = '';
  }




}
