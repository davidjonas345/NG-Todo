import {Component, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators, AbstractControl} from "@angular/forms";
import {Todo} from "./todo.interface";
import {TodoService} from "./todo.service";



@Component({
    selector: 'todo-list',
    template: `
        <form style="text-align: center" [formGroup]="todoForm" (submit)="onSubmit()">
            <div>
                <label for="todo">Your todos!</label><br>
                <input type="text" id="todo" formControlName="todo">
                <button type="submit" [disabled]="todoForm.invalid">add todo</button>
                <br><br>
                <div *ngIf="todoControl?.invalid && todoControl?.touched">
                    <p *ngIf="todoControl?.errors?.required" style="color: red; font-size: 10px; margin-top: -15px ">
                        Todo have
                        to be at last 6 character! </p>
                </div>
            </div>
        </form>
        <ul>
            <div class="listEl">
            <li *ngFor="let todo of todos">
                <input type="checkbox">
                {{todo.title}}
                <button (click)="deleteItem(todo.id)">Delete</button>
                <button>Edit</button>
            </li>
            </div>
        </ul>
    `,
    styles: [
        'li { border: 1px solid black; padding: 5px 5px; width: fit-content; list-style-type: none; text-align: center; margin: 8px auto}',
    ]
})
export class TodoListComponent implements OnInit {

    todos: Todo[] = [];
    hasError = false;
    todoId: number | undefined;

    todoForm: FormGroup = new FormGroup({
        todo: new FormControl(null,
            [
                Validators.required,
                Validators.minLength(6)
            ])
    })

    constructor(private todoService: TodoService) {
    }

    ngOnInit(): void {
        this.todoService.getTodos().subscribe(todos => {
            console.log(todos);
            this.todos = todos;
        }, (error) => {
            this.hasError = true;
        });
    }

    onSubmit(): void {
        const newTodo: Todo = {
            title: this.todoForm.value.todo,
            completed: false,
            editing: false,
        }
        this.todos.push(newTodo);
        console.log(this.todos);
        this.todoService.addTodo(newTodo).subscribe(todo =>
            console.log(todo));
    }

    get todoControl(): AbstractControl | null {
        return this.todoForm.get('todo')
    }
    deleteItem(id: number): void {
        this.todos = this.todos.filter(todo => todo.id !== id);
    }
}
