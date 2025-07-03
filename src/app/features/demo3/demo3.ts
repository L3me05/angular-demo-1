import {Component, computed, inject, OnInit, signal} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-demo3',
  imports: [
    CommonModule
  ],
  template: `
    <div class="centered-page sm flex flex-col gap-3">
      <h1 class="page-title">Todo List</h1>

      @if (error()) {
        <div class="bg-red-400 rounded-xl p-3 text-black">
          errore!
        </div>
      }

      <!--RECAP-->
      <div>
        {{totalCompleted()}} completed | {{ totalTodos() }} todos
      </div>

      <!--Form-->
      <input
        type="text"
        class="input input-bordered"
        #inputRef
        (keydown.enter)="addTodo(inputRef)"
        placeholder="add todo"
      >

      <!--List-->
      <ul>
        @for (todo of todos(); track todo.id) {
          <li class="flex justify-between">
            <div class="flex gap-3">
              <input
                type="checkbox" [checked]="todo.completed"
                (change)="toggleTodo(todo)"
              >
              <span [ngClass]="{'line-through': todo.completed}">
                        {{todo.title}}
                    </span>
            </div>
            <button (click)="removeTodo(todo)">❌</button>
          </li>
        }
      </ul>

    </div>
  `,
  styles: ``
})
export class Demo3 implements OnInit{

  todos = signal<Todo[]>([])
  http = inject(HttpClient)
  error = signal(false)

  ngOnInit(): void {
    this.http.get<Todo[]>(`http://localhost:3000/todos`)
      .subscribe({
        next: res => {
          this.todos.set(res)
        },
        error: () => {
          this.error.set(true)
        }
      })
  }

  totalCompleted = computed(() => this.todos().filter(t => t.completed).length)
  totalTodos = computed(() => this.todos().filter(t => !t.completed).length)

  addTodo(input: HTMLInputElement) {
    this.error.set(false)
    this.http.post<Todo>(`http://localhost:3000/todos`, {
      title: input.value,
      completed: false
    })
      .subscribe({
        next: newTodo => {
          this.todos.update(todos => [...todos, newTodo])
          input.value = ''
        },
        error: () => {
          this.error.set(true)
        }
      })
  }

  removeTodo(todoToRemove: Todo) {
    this.error.set(false)
    this.http.delete(`http://localhost:3000/todos/${todoToRemove.id}`)
      .subscribe({
        next: () => {
          this.todos.update(todos => todos.filter(todo => todo.id !== todoToRemove.id))
        },
        error: () => {
          this.error.set(true)
        }
      })
  }

  toggleTodo(todoToToggle: Todo) {
    this.error.set(false)
    this.http.patch<Todo>(`http://localhost:3000/todos/${todoToToggle.id}`, {
      ...todoToToggle,
      completed: !todoToToggle.completed
    })
      .subscribe({
        next: res => {
          this.todos.update(todos => {
            return todos.map(t => t.id === todoToToggle.id ? res : t);
          })
        },
        error: () => {
          this.error.set(true)
        }
      })

  }
}

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}
