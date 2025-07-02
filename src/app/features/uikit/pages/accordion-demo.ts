import { Component } from '@angular/core';
import {AccordionItem} from '../../../shared/components/accordion-item';

@Component({
  selector: 'app-accordion-demo',
  imports: [
    AccordionItem
  ],
  template: `
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
  `,
  styles: ``
})
export default class AccordionDemo {
  doSomething() {
    window.alert('hello');
  }

}
