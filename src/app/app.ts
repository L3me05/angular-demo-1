import {Component, computed, effect, signal} from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [],
  template: `

    <div class="flex flex-col p-4  gap-8">
      <h1 class="flex justify-center p-4 text-3xl border-b">Signal Effect</h1>

      <div class="flex justify-center p-4 gap-2">
        <button class="btn" (click)="dec()">-</button>
        <span
          class="text-2xl"
          [style.color]="isZeroColor()"
        >
          {{counter()}}
        </span>
        <button class="btn" (click)="inc()">+</button>

        <button
          class="btn"
          (click)="reset()"
          [style.display]="hideIfZero()"
        >
          reset
        </button>

      </div>

      <div class="flex justify-center items-baseline" [hidden]="!isZero()">Counter is zero!</div>
    </div>


  `,
  styles: `

  `,

  styleUrl: './app.css'
})


export class App {
  counter = signal(0);

  constructor() {
    effect(() => {
      localStorage.setItem('counter', JSON.stringify(this.counter()));
    });
  }


  dec() {
    this.counter.update(c => c - 1);
  }

  inc() {
    this.counter.update(c=> c+1);
  }

  reset() {
    this.counter.set(0);
  }


  isZero= computed(() => {
    return this.counter() === 0
  })

  hideIfZero = computed(() => {
    return this.counter() === 0 ? 'none' : 'inline'
    }
  )

  isZeroColor = computed( () => {
    return this.isZero() ? 'red' : 'green'
  })

  //si può utilizzare linkedSignal nel caso si vuole poter scrivere sulla variabile cosa che con computed non è permesso
}
