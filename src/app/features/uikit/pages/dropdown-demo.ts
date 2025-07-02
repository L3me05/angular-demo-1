import { Component } from '@angular/core';
import {Dropdown, DropdownItem} from '../../../shared/components/dropdown';

@Component({
  selector: 'app-dropdown-demo',
  imports: [
    Dropdown
  ],
  template: `
    <div class="flex justify-between p-8">
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
  styles: ``
})
export default class DropdownDemo {
  list = [
    { label: 'item 1', value: 1},
    { label: 'item 2', value: 2},
    { label: 'item 3', value: 'something'}
  ]

  doSomethingElse(event: DropdownItem) {
    console.log('do something else', event)
  }

}
