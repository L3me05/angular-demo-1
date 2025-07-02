import {Component, inject, Input} from '@angular/core';

@Component({
  selector: 'app-demo1',
  imports: [],
  template: `
    <p>
      {{ title }}
    </p>
  `,
  styles: ``
})
export default class Demo1 {


  @Input() title= '';

  // activateRoute = inject(ActivatedRoute)
  // constructor() {
  //   this.activateRoute.data.subscribe( res => {
  //     this.title= res['title']
  //   })
  // }
}
