import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import {ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {RouterModule} from "@angular/router";
import { EditTodoComponent } from './edit-todo/edit-todo.component';
import {TodoService} from "./todo-list/todo.service";
import {TodoRoutingModule} from "./routing/todo-routing.module";



@NgModule({
    declarations: [
        AppComponent,
        TodoListComponent,
        EditTodoComponent,
    ],
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        HttpClientModule,
        RouterModule,
        TodoRoutingModule,
    ],
    providers: [TodoService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
