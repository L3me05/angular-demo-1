import {Component, inject, Input, OnChanges, SimpleChange, SimpleChanges} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../../../model/user';
import {JsonPipe} from '@angular/common';

@Component({
  selector: 'app-user-profile',
  imports: [
    JsonPipe
  ],
  template: `
    <p>
      Current id: {{ id }}
    </p>

    <pre>
      {{user | json}}
    </pre>
  `,
  styles: ``
})
export class UserProfile implements OnChanges{
  @Input() id: number | undefined;
  http = inject(HttpClient)
  user: User | undefined;

  ngOnChanges ( changes:SimpleChanges) {
    console.log('ngOnChanges', changes)

    this.http.get<User>(`https://jsonplaceholder.typicode.com/users/${changes['id'].currentValue}`)
      .subscribe(res => {
        this.user =res;
      })
  }


}
