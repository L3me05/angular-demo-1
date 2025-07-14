import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Todo } from '../../../model/todos';

@Injectable()
export class TodosService {

  http = inject(HttpClient);

  load() {
    return this.http.get<Todo[]>(`http://localhost:3000/todos`)
  }

  addTodo(value: string) {
    return this.http.post<Todo>(`http://localhost:3000/todos`, {
      title: value,
      completed: false
    })
  }
}
