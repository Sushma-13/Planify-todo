import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { Priority, Task } from 'src/app/models/task';
import { TodoService } from 'src/app/services/todo.service';

enum Action {
  add,
  edit,
}

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css'],
})
export class AddTaskComponent implements OnInit, OnDestroy {
  selectedDate = new Date();

  action: Action = 0;

  task: Task = {
    id: new Date().getTime(),
    title: '',
    description: '',
    priority: Priority.medium,
    type: 0,
    deadline: this.selectedDate,
  };

  editTaskSubscription: Subscription;

  constructor(
    private dialogRef: MatDialogRef<AddTaskComponent>,
    private todoService: TodoService
  ) {}

  ngOnInit(): void {
    this.editTaskSubscription = this.todoService.editTask.subscribe(
      (taskToEdit: Task) => {
        if (!taskToEdit) {
          return;
        }
        this.task = Object.assign({}, taskToEdit);
        this.selectedDate = taskToEdit.deadline;
        this.action = 1;
      }
    );
  }

  onDateSelect(date: Date): void {
    this.selectedDate = date;
  }

  save(form): void {
    form.value.deadline = this.selectedDate;
    const task = new Task(
      new Date().getTime(),
      form.value.title,
      form.value.description,
      form.value.priority,
      0,
      form.value.deadline
    );
    // console.log('added ', task);
    this.todoService.addToDo(task);
    this.todoService.editTask.next(null);
    this.dialogRef.close();
  }
  update(form): void {
    form.value.deadline = this.selectedDate;
    const task = new Task(
      this.task.id,
      form.value.title,
      form.value.description,
      form.value.priority,
      this.task.type,
      form.value.deadline
    );
    // console.log('update ', task);
    this.todoService.updateToDo(task);
    this.todoService.editTask.next(null);
    this.dialogRef.close();
  }

  close(): void {
    this.dialogRef.close();
    this.todoService.editTask.next(null);
  }

  ngOnDestroy(): void {
    this.editTaskSubscription?.unsubscribe();
  }
}
