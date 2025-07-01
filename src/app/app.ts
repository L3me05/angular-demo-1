import {CommonModule} from '@angular/common';
import {Component} from '@angular/core';
import {UserProfile} from './shared/components/user-profile/user-profile';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, UserProfile],
  template: `
    <div class="flex flex-col items-center justify-center p-8 gap-4 ">
      <button class="btn text-xl" (click)="visible=!visible">Toggle</button>

      <div class="flex items-center p-8 gap-5">
        @if (visible) {
          <button
          class="btn text-2xl"
          (click)="inc()"
          >
            +
          </button>
          <app-user-profile [id]="id"/>
        }

      </div>



    </div>


  `,
  styles: `



  `,

  styleUrl: './app.css'
})


export class App {
  visible = true;
  id=1;

  inc() {
    if(this.id<10) {
      this.id++;
    } else {
      this.id=1;
    }
  }


}
