import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-todos-form',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  template: `
    <input
        type="text"
        class="input input-bordered"
        #inputRef
        (keydown.enter)="addTodo.emit(inputRef)"
        placeholder="add todo"
      />
  `,
  styles: ``
})
export class TodosForm {
  @Output() addTodo = new EventEmitter<HTMLInputElement>();
}
