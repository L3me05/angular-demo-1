import {Component, computed, inject, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AsyncPipe, JsonPipe} from '@angular/common';
import {User} from '../../model/user';
import {toSignal} from '@angular/core/rxjs-interop';
import {delay} from 'rxjs';

@Component({
  selector: 'app-demo2',
  imports: [
    JsonPipe
  ],
  template: `
    <p class="p-4">
      demo2 works!
    </p>
    <hr>


    @for(user of users(); track user.id) {
      <li>{{user.name}}</li>
    }

    <pre>{{names() | json}}</pre>


<!--    @for(user of users(); track user.id) {-->
<!--      <li>{{user.name}}</li>-->
<!--    }-->

<!--    @for(user of users$ | async; track user.id) {-->
<!--      <li>{{user.name}}</li>-->
<!--    }-->

  `,
  styles: ``
})
export class Demo2 {


  users = toSignal(
    inject(HttpClient)
    .get<User[]>('https://jsonplaceholder.typicode.com/users')
      // .pipe(
      //   delay(1000)
      // )
  )

  names = computed( () => this.users()?.map(user => user.name))



  // http = inject(HttpClient)
  // users= signal<User[]>([])
  //
  // constructor() {
  //   this.http.get<User[]>('https://jsonplaceholder.typicode.com/users')
  //     .subscribe(res => {
  //       this.users.set(res)
  //       console.log(res)
  //     })
  //
  // }

  // users$ = inject(HttpClient)
  //   .get<User[]>('https://jsonplaceholder.typicode.com/users')

}
