import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { HttpError } from '../../shared/components/http-error';
import { TodosSummary } from "./components/todos-summary";
import { TodosForm } from "./components/todos-form";
import { TodosList } from "./components/todos-list";
import { Todo } from '../../model/todos';
import { TodosService } from './services/todos.service';

@Component({
  selector: 'app-demo3',
  providers: [
    TodosService
  ],
  imports: [CommonModule, HttpError, TodosSummary, TodosForm, TodosList],
  template: `
    <div class="centered-page sm flex flex-col gap-3">
      <h1 class="page-title">Todo List</h1>

      @if (error()) {
      <app-http-error>Server error </app-http-error>
      }

      <app-todos-summary
        [completed]="totalCompleted()"
        [todos]="totalTodos()"
      />
      
      <app-todos-form
        (addTodo)="addTodo($event)"
      />
      
      <app-todos-list
        [todos]="todos()"
        (toggleTodo)="toggleTodo($event)"
        (removeTodo)="removeTodo($event)"
      />
      
    </div>
  `,
  styles: ``,
})
export class Demo3 implements OnInit {
  todos = signal<Todo[]>([]);
  http = inject(HttpClient);
  error = signal(false);
  todosService = inject(TodosService);

  ngOnInit(): void {
    this.todosService.load()
      .subscribe({
        next: (res) => {
          this.todos.set(res);
        },
        error: () => {
          this.error.set(true);
        },
      });
  }

  totalCompleted = computed(
    () => this.todos().filter((t) => t.completed).length
  );
  totalTodos = computed(() => this.todos().filter((t) => !t.completed).length);

  addTodo(input: HTMLInputElement) {
    this.error.set(false);
    this.todosService.addTodo(input.value)
      .subscribe({
        next: (newTodo) => {
          this.todos.update((todos) => [...todos, newTodo]);
          input.value = '';
        },
        error: () => {
          this.error.set(true);
        },
      });
  }

  removeTodo(todoToRemove: Todo) {
    this.error.set(false);
    this.http
      .delete(`http://localhost:3000/todos/${todoToRemove.id}`)
      .subscribe({
        next: () => {
          this.todos.update((todos) =>
            todos.filter((todo) => todo.id !== todoToRemove.id)
          );
        },
        error: () => {
          this.error.set(true);
        },
      });
  }

  toggleTodo(todoToToggle: Todo) {
    this.error.set(false);
    this.http
      .patch<Todo>(`http://localhost:3000/todos/${todoToToggle.id}`, {
        ...todoToToggle,
        completed: !todoToToggle.completed,
      })
      .subscribe({
        next: (res) => {
          this.todos.update((todos) => {
            return todos.map((t) => (t.id === todoToToggle.id ? res : t));
          });
        },
        error: () => {
          this.error.set(true);
        },
      });
  }
}


