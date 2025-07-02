import {CommonModule} from '@angular/common';
import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {Navbar} from './core/components/navbar';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, Navbar],
  template: `
    <app-navbar />

    <div class="max-w-screen-lg mx-3 lg:mx-auto">
      <router-outlet />
    </div>










  `,
  styles: `



  `,

  styleUrl: './app.css'
})


export class App {




}
