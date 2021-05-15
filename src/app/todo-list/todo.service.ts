import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable } from "rxjs";
import {Todo} from "./todo.interface";


@Injectable({
  providedIn: 'root'
})
export class TodoService {
  static todosUrl = 'http://localhost:3000/Todo';

  constructor(private http: HttpClient) {

  }
  getTodos(): Observable<Todo[]>{
    return this.http.get<Todo[]>(TodoService.todosUrl)
  }
  addTodo(newTodo: Todo | undefined): Observable<Todo>{
    return this.http.post<Todo>(TodoService.todosUrl, newTodo)
  }
  getTodoById(id: number): Observable<Todo>{
    return this.http.get<Todo>(TodoService.todosUrl + `/${id}`);
  }
  updateTodo(editedTodo: Todo | undefined): Observable<Todo>{
    return this.http.patch<Todo>(TodoService.todosUrl, editedTodo)
  }

}
