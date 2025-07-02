import {Component, inject, Input} from '@angular/core';

@Component({
  selector: 'app-product',
  imports: [],
  template: `
    <p>
      product works! {{productId}}
    </p>
  `,
  styles: ``
})
export default class Product {

  @Input() productId: string | undefined;

  // activatedRoute = inject(ActivatedRoute)
  // constructor() {
  //   this.activatedRoute.params.subscribe( res => {
  //     this.productId = res['productId']
  //   })
  // }

}
