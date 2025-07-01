import {ChangeDetectionStrategy, Component, inject, Input} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../../../model/user';
import {JsonPipe} from '@angular/common';

@Component({
  selector: 'app-user-profile',
  changeDetection: ChangeDetectionStrategy.OnPush,        //migliora le performace da prestare attenzione.
  imports: [
    JsonPipe
  ],
  template: `
    <p>
      Current id: {{ userId }}
    </p>

    <pre>
      {{user | json}}
    </pre>

    {{render()}}
  `,
  styles: ``
})
export class UserProfile {
  userId: number | undefined;
  @Input() set id (val: number | undefined){
    this.userId = val;
    this.http.get<User>(`https://jsonplaceholder.typicode.com/users/${val}`)
      .subscribe(res => {
        this.user = res;
      })
  }
  http = inject(HttpClient)
  user: User | undefined;


  render() {
    console.log('render user-profile');
  }

  //
  // ngOnChanges ( changes:SimpleChanges) {
  //   console.log('ngOnChanges', changes)
  //
  //   this.http.get<User>(`https://jsonplaceholder.typicode.com/users/${changes['id'].currentValue}`)
  //     .subscribe(res => {
  //       this.user =res;
  //     })
  // }


}
