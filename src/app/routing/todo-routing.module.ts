import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {EditTodoComponent} from "../edit-todo/edit-todo.component";
import {TodoListComponent} from "../todo-list/todo-list.component";

const routes: Routes = [
  {path: '', component: TodoListComponent},
  {path: 'edit/:id', component: EditTodoComponent}
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    [RouterModule.forRoot(routes)]
  ],
  exports: [
      RouterModule
  ]
})
export class TodoRoutingModule { }
