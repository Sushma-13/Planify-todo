import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Task } from 'src/app/models/task';
import { TodoService } from 'src/app/services/todo.service';
import { AddTaskComponent } from '../add-task/add-task.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  constructor(public dialog: MatDialog, private todoService: TodoService) {}
  ngOnInit(): void {
    this.todoService.editTask.subscribe((taskToUpdate) => {
      if (!taskToUpdate) {
        return;
      }
      this.openDialog(taskToUpdate);
    });
  }

  openDialog(task?: Task): void {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    if (task) {
      dialogConfig.data = { ...task };
    }

    this.dialog.open(AddTaskComponent, dialogConfig);
  }
}
