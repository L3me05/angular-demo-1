import { Component } from '@angular/core';
import {RouterLink, RouterLinkActive} from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [
    RouterLink,
    RouterLinkActive
  ],
  template: `
    <div class="navbar bg-base-100 shadow-sm">
      <div class="flex-1">
        <a class="btn btn-ghost text-xl">daisyUI</a>
      </div>
      <div class="flex-none">
        <ul class="menu menu-horizontal px-1">
          <li routerLink="demo1" routerLinkActive="text-sky-400"><a>Demo1</a></li>
          <li routerLink="demo2" routerLinkActive="text-sky-400"><a>Demo2</a></li>
          <li routerLink="demo3" routerLinkActive="text-sky-400"><a>Demo3</a></li>
        </ul>
      </div>
    </div>
  `,
  styles: ``
})
export class Navbar {

}
