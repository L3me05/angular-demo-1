import { Component } from '@angular/core';
import {VariantIcon} from '../../../shared/components/variant-icon';

@Component({
  selector: 'app-variant-icon-demo',
  imports: [
    VariantIcon
  ],
  template: `
    <app-variant-icon />
    <app-variant-icon variant="info" />
    <app-variant-icon variant="success" />
    <app-variant-icon variant="error" />
  `,
  styles: ``
})
export default class VariantIconDemo {

}
