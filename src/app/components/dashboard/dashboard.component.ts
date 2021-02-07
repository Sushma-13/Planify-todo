import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatCalendar } from '@angular/material/datepicker';
import { Task } from 'src/app/models/task';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  alltasks: Task[] = [];
  pending: Task[] = [];
  inProgress: Task[] = [];
  completed: Task[] = [];

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.todoService.getToDos();
    this.todoService.$allTask.subscribe((tasks) => {
      this.alltasks = tasks;
      this.seperateTasks();
    });
  }

  seperateTasks(): void {
    this.pending = this.alltasks.filter((task) => task.type === 0);
    this.inProgress = this.alltasks.filter((task) => task.type === 1);
    this.completed = this.alltasks.filter((task) => task.type === 2);
  }

  drop(event: CdkDragDrop<Task[]>): void {
    if (event.container.id !== event.previousContainer.id) {
      event.item.data.type =
        event.container.id === 'inProgressTasks'
          ? 1
          : event.container.id === 'completedTasks'
          ? 2
          : 0;
    }
    if (event.previousContainer === event.container) {
      return;
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }
}
