import { Component } from '@angular/core';
import {Alert} from '../../../shared/components/alert';

@Component({
  selector: 'app-alert-demo',
  imports: [
    Alert
  ],
  template: `
    <div class="flex flex-col p-6 gap-6">
      <app-alert>msg</app-alert>
      <app-alert variant="info">msg</app-alert>
      <app-alert variant="success">msg</app-alert>
      <app-alert variant="error">msg</app-alert>
      <app-alert
        (onCancel)="cancel()"
        (onConfirm)="approve()"
        denyLabel="cancel"
        acceptLabel="confirm"
        variant="warning"
      >
        this is a message
      </app-alert>

      <app-alert
        (onCancel)="cancel2()"
        (onConfirm)="approve2()"
      >
        <div class="flex flex-col gap-4">
          <em>Hola </em>
          <strong>bro</strong>
          <input type="text" class="input input-bordered">
        </div>
      </app-alert>
    </div>
  `,
  styles: ``
})
export default class AlertDemo {
  approve() {
    window.alert('approved');
  }

  cancel() {
    window.alert('canceled');
  }

  approve2(){
    console.log("you are approved")
  }

  cancel2() {
    console.log("you are canceled")
  }


}
