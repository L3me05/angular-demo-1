import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Navbar } from "./core/navbar";
import { RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, Navbar, RouterOutlet],
  template: `
    <app-navbar />
    <div class="max-w-screen-md mx-auto">
      <router-outlet />
    </div>

  `,
  styles: `



  `,

  styleUrl: './app.css'
})


export class App {




}
