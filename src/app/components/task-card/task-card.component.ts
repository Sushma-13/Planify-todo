import { Component, Input, OnInit } from '@angular/core';
import { Task } from 'src/app/models/task';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.css'],
})
export class TaskCardComponent implements OnInit {
  @Input()
  task: Task;

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {}

  modify(): void {
    if (!this.task) {
      return;
    }
    this.todoService.editTask.next(this.task);
  }
  remove(): void {
    if (!this.task) {
      return;
    }
    this.todoService.removeToDo(this.task.id);
  }
}
