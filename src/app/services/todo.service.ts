import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Task } from '../models/task';
import todoResponse from '../todosMockData';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  editTask = new BehaviorSubject<Task>(null);

  $allTask = new BehaviorSubject<Task[]>(todoResponse);

  todos = [];

  constructor() {
    this.$allTask.subscribe((tasks) => {
      this.todos = tasks;
    });
  }

  getToDos(): Task[] {
    this.$allTask.next(todoResponse);
    return todoResponse;
  }

  addToDo(task: Task): void {
    this.todos.push(task);
    this.todos.sort((a: Task, b: Task) => b.deadline.getTime() - a.deadline.getTime());
    this.$allTask.next(this.todos);
  }

  updateToDo(task: Task): void {
    this.todos = this.todos.map((t: Task) => {
      if (t.id === task.id) {
        t = Object.assign(t, task);
      }
      return t;
    });
    this.todos.sort((a: Task, b: Task) => b.deadline.getTime() - a.deadline.getTime());
    this.$allTask.next(this.todos);
  }
  removeToDo(taskId: number): void {
    this.todos = this.todos.filter((t) => t.id !== taskId);
    this.$allTask.next(this.todos);
  }
}
