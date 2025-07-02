import { Component } from '@angular/core';
import {Phone} from '../../../shared/components/phone';

@Component({
  selector: 'app-phone-demo',
  imports: [
    Phone
  ],
  template: `
    <div class="">
      <app-phone
        [src]="url"
        [alt]="alt"
        [showTitle]="true"
        size="xl"
      />

      <app-phone
        [src]="url"
        [alt]="alt"
        size="sm"
      />

    </div>
  `,
  styles: ``
})
export default class PhoneDemo {
  url = '/images/wallpaper.jpg'
  alt = 'landscape'
}
