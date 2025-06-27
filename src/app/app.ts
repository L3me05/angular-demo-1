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
}
