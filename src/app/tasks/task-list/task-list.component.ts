import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
})
export class TaskListComponent implements OnInit {
  tasks: any[] = [];
  isLoading = false;
  totalTasks = 10;
  tasksPerPage = 2;
  currentPage = 1;
  pageSizeOptions = [1, 2, 5, 10];

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.isLoading = true;
    this.getTasks();
  }

  getTasks() {
    this.taskService.getTasks(this.tasksPerPage, this.currentPage).subscribe(
      (tasks) => {
        this.tasks = tasks;
        this.isLoading = false;
      },
      (error) => {
        console.error('Error fetching tasks:', error);
      }
    );
  }

  onChangedPage(pageData: PageEvent) {
    this.isLoading = true;
    this.currentPage = pageData.pageIndex + 1;
    this.tasksPerPage = pageData.pageSize;
    this.taskService.getTasks(this.tasksPerPage, this.currentPage).subscribe(
      (tasks) => {
        this.tasks = tasks;
        this.isLoading = false;
      },
      (error) => {
        console.error('Error fetching tasks:', error);
      }
    );
  }

  onDelete(taskId: string) {
    this.isLoading = true;
    this.taskService.deleteTask(taskId).subscribe(() => {
      this.taskService.getTasks(this.tasksPerPage, 1).subscribe((tasks) => {
        this.tasks = tasks;
        this.isLoading = false;
      });
    });
  }
}
