import {Component, Input, OnInit, Output} from '@angular/core';
import {Todo} from "../todo-list/todo.interface";
import {TodoService} from "../todo-list/todo.service";
import {ActivatedRoute} from "@angular/router";
import {AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";

interface Edit {
  link: string
  name?: string
}

@Component({
  selector: 'edit-todo',
  template: `
    <form style="text-align: center" [formGroup]="todoForm" (submit)="saveTodo()">
      <div>
        <label for="todo">Changes!</label><br>
        <input type="text" id="todo" formControlName="todo">
        <button type="submit" [disabled]="todoForm.invalid">Save</button>
        <br><br>
        <div *ngIf="todoControl?.invalid && todoControl?.touched">
          <p *ngIf="todoControl?.errors?.required" style="color: red; font-size: 10px; margin-top: -15px ">
            Todo have to be at last 6 character! </p>
        </div>
      </div>
    </form>
  `,
  styles: [
  ]
})
export class EditTodoComponent implements OnInit {
  todo: Todo;
  todoId: number;

  todoForm: FormGroup = new FormGroup({
    todo: new FormControl(null,
        [
          Validators.required,
          Validators.minLength(6)
        ])
  })

  constructor(private todoService: TodoService, private router: ActivatedRoute) { }

  ngOnInit(): void {
    this.router.params.subscribe(params => {
      this.todoId = params.id;
    });
    this.todoService.getTodoById(this.todoId).subscribe(todo => {
      this.todoControl.setValue(todo.title)
      console.log(todo);
    });
  }

  get todoControl(): AbstractControl | null {
    return this.todoForm.get('todo')
  }
  saveTodo() {
    this.todoService.updateTodo(this.todo).subscribe( savedTodo =>{
      console.log(savedTodo)
    })
  }

}
