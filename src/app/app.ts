import {Component, computed, signal} from '@angular/core';
import {CommonModule} from '@angular/common';


type Product = {
  id: number;
  name: String;
  cost: number;
}

type Prodotti = {
  id: number;
  name: string;
  cost: number;
  description?: string;
}

const prodottiIniziali: Prodotti[] = [
  {id: 1, name: 'Chocolate', cost: 3, description: 'A delicious chocolate'},
  {id: 2, name: 'Milk', cost: 1, description: 'A delicious milk'},
  {id: 3, name: 'Biscuits', cost: 2, description: 'A delicious biscuits'},
]


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  template: `

    <div class="flex flex-col justify-center items-center p-8 gap-8">
      <button
      class="btn"
      (click)="changeVisible()"
      >

      </button>
      <h1
      *ngIf="visible()"
      >
        Hello
      </h1>
    </div>

    <div class="flex flex-col gap-2 items-center border-t p-8 m-4">
    <li *ngFor="let product of products()">
      {{product.name}}
    </li>
    </div>

    <div class="flex flex-col gap-2 items-center border-t p-8 m-4">
      @if (logged()) {
        <h1 class="items-center text-3xl">Hi Dev</h1>
        <button class="btn" (click)="logout()">Logout</button>
      } @else {
        <h1 class="items-center text-3xl">Login</h1>
        <button class="btn" (click)="signIn()">Sign In</button>
      }
    </div>

    <div class="flex flex-col gap-2 items-center border-t p-8 m-4">
      @switch (currentStep()) {
        @case ('step1') {
         <h1>Welcome to step1</h1>
          <button class="btn" (click)="currentStep.set('step2')">Next</button>
        }
        @case ('step2') {
          <h1>Welcome to step2</h1>
          <button class="btn" (click)="currentStep.set('final')">Next</button>
        }
        @case ('final') {
          <h1>Welcome to the final step</h1>
        }
        @default {
          <h1>Welcome to the start</h1>
          <button class="btn" (click)="currentStep.set('step1')">Next</button>
        }
      }
    </div>

    <div class="flex flex-col gap-2 place-items-center border-t p-8 m-4">
        @for (prodotto of prodotti(); track prodotto.id; let i = $index; let last = $last) {
          <li >
            {{i+1}} {{prodotto.name}}
            @if (last) {
              <hr>
            }
          </li>

        } @empty {
          <button class="btn" (click)="caricaProdotti()">Carica</button>
        }

        @if (!noProdotti()) {
          <h1>Nel carrello ci sono {{totaleProdotti()}} prodotti</h1>
        }
    </div>

    <div class="flex flex-col gap-2 p-8 m-4">
      <div class="flex gap-3 justify-center">
        @for (prodotto of prodotti(); track prodotto.id) {
          <button class="btn" (click)="selezionaProdotto(prodotto)">{{prodotto.name}}</button>
        }
      </div>
      <div class="flex flex-col p-4 gap-2">
        @if (prodottoAttivo()) {
          <h1 class="text-3xl text-red-800">Products Details</h1>
          <div>Cost: {{prodottoAttivo()?.cost}} $</div>
          <div>Description: {{prodottoAttivo()?.description}}</div>
        } @else {
          <div>Select a product</div>
        }
      </div>

    </div>

      <!--        Todo List-->
      <div class="flex flex-col gap-6 place-items-center border-t p-8 m-4">
        <div>
          {{totalCompleted()}} completed | {{totalTodo()}} todos
        </div>
        <div class="">
          <input
            type="text"
            class="input"
            (keydown.enter)="addTodo(event)"
            #event
            placeholder="Add todo"
          >
        </div>
        <ul class="flex flex-col gap-2">
          @for (todo of todos(); track todo.id) {
          <li class="flex justify-between">
            <div class="flex gap-3">
              <input
                type="checkbox"
                class="checkbox"
                [checked]="todo.completed"
                (change)="toggleTodo(todo)"
              >
              <span [ngClass]="{ 'line-through': todo.completed}">
                {{todo.title}}
              </span>
            </div>

            <button class="ml-6 text-red-400" (click)="removeTodo(todo)">
              X
            </button>

          </li>
          }
        </ul>

        <pre>{{todos() | json}}</pre>

      </div>




  `,
  styles: `




  `,

  styleUrl: './app.css'
})


export class App {
  visible = signal(false);
  logged= signal(false);
  currentStep = signal<'step1' | 'step2' | 'final' | null> (null)
  prodotti = signal <Prodotti[]>([]);

  noProdotti = computed( () => this.prodotti().length === 0)
  totaleProdotti = computed( () => this.prodotti().length)

  prodottoAttivo = signal<Prodotti | null> (null)

  selezionaProdotto (prodotto: Prodotti) {
    this.prodottoAttivo.set(prodotto)
  }

  changeVisible() {
    this.visible.update(v => !v)
  }

  products = signal<Product[]>([
    {id: 1, name: 'Product 1', cost: 100},
    {id: 2, name: 'Product 2', cost: 200},
    {id: 3, name: 'Product 3', cost: 300},
  ])

  signIn() {
    this.logged.set(true)
  }

  logout() {
    this.logged.set(false)
  }

  caricaProdotti() {
    this.prodotti.set(prodottiIniziali)
  }


  todos = signal<Todo[]>([
    { id: 1, title: 'Todo 1', completed: true },
    { id: 2, title: 'Todo 2', completed: false },
    { id: 3, title: 'Todo 3', completed: true },
  ])

  toggleTodo(todoToToggle: Todo) {
    this.todos.update(todos => {
      return todos.map( t => t.id === todoToToggle.id ? { ...t, completed: !t.completed } : t )
    })
  }

  removeTodo(todoToRemove: Todo) {
    this.todos.update(todos => todos.filter(t => t.id !== todoToRemove.id))
  }

  addTodo(input: HTMLInputElement) {
    const newTodo : Todo = {
      id: Date.now(),
      title: input.value,
      completed: false
    }
    this.todos.update(todos => [...todos, newTodo])
    input.value = ''

  }

  totalCompleted = computed( () => this.todos().filter(t => t.completed).length)
  totalTodo = computed ( () => this.todos().filter( t => !t.completed).length)


}


interface Todo {
  id: number;
  title: string;
  completed: boolean;
}
