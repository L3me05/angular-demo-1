import {booleanAttribute, Component, input, Input} from '@angular/core';

@Component({
  selector: 'app-phone',
  standalone: true,
  imports: [],
  template: `
    <div class="mockup-phone border-primary">
      <div class="mockup-phone-camera"></div>
      <div class="mockup-phone-display flex items-center">
        <img
          [src]="wallpaper"
          [alt]="alt"
          [style.width.%]="size"
        >
      </div>
      <div class="mockup-phone-display flex justify-center items-end p-8">
        @if (showTitle) {
          {{ alt }}
        }
      </div>
    </div>
  `,
  styles: ``
})
export class Phone {
  @Input({alias:'url', required: true})
  wallpaper : string= '';
  @Input({ transform: (val: string) => {
      return val.toUpperCase()
    }})
  alt: string = 'image'

  @Input({transform: booleanAttribute})
  showTitle = false;

  @Input({transform: (val: 'sm' | 'md' | 'xl') => {
    switch (val) {
      case 'sm': return 50;
      case 'md': return 75;
      default:
      case "xl": return 100;
    }
    }})
  size = 100;
}
