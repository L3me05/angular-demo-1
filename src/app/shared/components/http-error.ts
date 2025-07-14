import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-http-error',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  template: ` <div class="bg-red-400 rounded-xl p-3 text-black">errore!</div> `,
  styles: ``,
})
export class HttpError { }
