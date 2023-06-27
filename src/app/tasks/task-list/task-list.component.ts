import { Component, OnDestroy, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { PageEvent } from '@angular/material/paginator';
import { Task } from '../task.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
})
export class TaskListComponent implements OnInit, OnDestroy {
  tasks: any[] = [];
  isLoading = false;
  totalTasks = 0;
  tasksPerPage = 2;
  currentPage = 1;
  pageSizeOptions = [1, 2, 5, 10];
  private tasksSub: Subscription;

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.isLoading = true;
    this.taskService.getTasks(this.tasksPerPage, this.currentPage);
    this.tasksSub = this.taskService
      .getTaskUpdateListener()
      .subscribe((taskData: { tasks: Task[]; taskCount: number }) => {
        this.isLoading = false;
        this.tasks = taskData.tasks;
        this.totalTasks = taskData.taskCount;
      });
  }

  onChangedPage(pageData: PageEvent) {
    this.isLoading = true;
    this.currentPage = pageData.pageIndex + 1;
    console.log(pageData, this.currentPage, pageData.pageIndex);
    this.tasksPerPage = pageData.pageSize;
    this.taskService.getTasks(this.tasksPerPage, this.currentPage).subscribe(
      (taskData: { tasks: Task[]; taskCount: number }) => {
        console.log(taskData);
        this.tasks = taskData.tasks;
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
  ngOnDestroy(): void {
    this.tasksSub.unsubscribe();
  }
}
