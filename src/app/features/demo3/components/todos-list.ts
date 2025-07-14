import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Todo } from '../../../model/todos';

@Component({
  selector: 'app-todos-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
  template: `
    <ul>
        @for (todo of todos; track todo.id) {
        <li class="flex justify-between">
          <div class="flex gap-3">
            <input
              type="checkbox"
              [checked]="todo.completed"
              (change)="toggleTodo.emit(todo)"
            />
            <span [ngClass]="{ 'line-through': todo.completed }">
              {{ todo.title }}
            </span>
          </div>
          <button (click)="removeTodo.emit(todo)">❌</button>
        </li>
        }
      </ul>
  `,
  styles: ``
})
export class TodosList {
  @Input() todos: Todo[] = [];
  @Output() toggleTodo = new EventEmitter<Todo>();
  @Output() removeTodo = new EventEmitter<Todo>();
}
