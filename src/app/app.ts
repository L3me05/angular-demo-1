import {CommonModule} from '@angular/common';
import {Component} from '@angular/core';
import {Timeline} from './shared/components/timeline';
import {AccordionItem} from './shared/components/accordion-item';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, Timeline, AccordionItem],
  template: `
    <div class="flex flex-col p-8 gap-4">

      <button class="btn" (click)="vertical=!vertical">Change</button>

      <app-timeline [items]="timeline" [vertical]="vertical"/>
    </div>

    <div class="">
      <app-accordion-item title="one" selected>
        lorem ipsum
      </app-accordion-item>

      <app-accordion-item title="two">
        Hello my friend
      </app-accordion-item>

      <app-accordion-item title="three">
        <button class="btn btn-info" (click)="doSomething()">Click</button>
      </app-accordion-item>

    </div>




  `,
  styles: `



  `,

  styleUrl: './app.css'
})


export class App {
timeline: {start: string, end: string}[] = [
  { start: '2014', end: 'description' },
  { start: '2015', end: 'lorem...' },
  { start: '2018', end: 'bla bla' },
  { start: '2022', end: 'another' },
  { start: '2023', end: 'hello' },
];

vertical= false;

doSomething() {
  window.alert('hello');
}



}
