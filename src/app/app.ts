import {CommonModule} from '@angular/common';
import {Component} from '@angular/core';
import {Phone} from './shared/components/phone/phone';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, Phone],
  template: `


    <app-phone
      [url]="wallpaper"
      [alt]="alt"
      showTitle
      size="md"
    />
    <app-phone
      [url]="wallpaper"
      [alt]="alt"
      showTitle
      size="sm"
    />



  `,
  styles: `



  `,

  styleUrl: './app.css'
})


export class App {
 wallpaper= '/images/wallpaper.jpg';
  alt = 'wallpaper';



}
