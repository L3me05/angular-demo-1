import {CommonModule} from '@angular/common';
import {Component} from '@angular/core';
import {Timeline} from './shared/components/timeline';
import {AccordionItem} from './shared/components/accordion-item';
import {Alert} from './shared/components/alert';
import {Dropdown, DropdownItem} from './shared/components/dropdown';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, Timeline, AccordionItem, Alert, Dropdown],
  template: `
<!--        timeline-->
    <div class="flex flex-col p-8 gap-4">

      <button class="btn" (click)="vertical=!vertical">Change</button>

      <app-timeline [items]="timeline" [vertical]="vertical"/>
    </div>

<!--        accordion item-->
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

<!--        Alert-->
    <div class="flex flex-col p-6 gap-6">
      <app-alert>msg</app-alert>
      <app-alert variant="info">msg</app-alert>
      <app-alert variant="success">msg</app-alert>
      <app-alert variant="error">msg</app-alert>
      <app-alert
        (onCancel)="cancel()"
        (onConfirm)="approve()"
        denyLabel="cancel"
        acceptLabel="confirm"
        variant="warning"
      >
        this is a message
      </app-alert>

      <app-alert
        (onCancel)="cancel2()"
        (onConfirm)="approve2()"
      >
        <div class="flex flex-col gap-4">
          <em>Hola </em>
          <strong>bro</strong>
          <input type="text" class="input input-bordered">
        </div>
      </app-alert>
    </div>

<!--        Dropdown-->
    <div class="flex justify-between p-8 m-10 border-t">
      <app-dropdown
        [items]="list"
        (select)="doSomethingElse($event)"
      >
        BOTTOM
      </app-dropdown>

      <app-dropdown [items]="list" placement="right">RIGHT</app-dropdown>
      <app-dropdown [items]="list" placement="top" hover>TOP H</app-dropdown>
      <app-dropdown [items]="list" placement="left" hover>LEFT H</app-dropdown>
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

  approve() {
    window.alert('approved');
  }

  cancel() {
    window.alert('canceled');
  }

  approve2(){
    console.log("you are approved")
  }

  cancel2() {
    console.log("you are canceled")
  }

  list = [
    { label: 'item 1', value: 1},
    { label: 'item 2', value: 2},
    { label: 'item 3', value: 'something'}
  ]

  doSomethingElse(event: DropdownItem) {
    console.log('do something else', event)
  }



}
