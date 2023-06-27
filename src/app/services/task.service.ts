import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, map } from 'rxjs';
import { Task } from '../tasks/task.model';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private tasks: Task[] = [];
  private tasksUpdated = new Subject<{ tasks: Task[]; taskCount: number }>();

  private apiUrl = 'http://localhost:3000/api/tasks';

  constructor(private http: HttpClient) {}

  getTasks(postPerPage: number, currentPage: number): Observable<any> {
    const queryParams = `?pagesize=${postPerPage}&page=${currentPage}`;
    return this.http.get<any>(this.apiUrl + queryParams).pipe(
      map((taskData) => {
        const transformedTaskData = {
          tasks: taskData.tasks.map((task) => ({
            title: task.title,
            description: task.description,
            status: task.status,
            createdAt: task.createdAt,
          })),
          taskCount: taskData.taskCount,
        };
        return transformedTaskData;
      })
    );
  }

  getTaskUpdateListener() {
    return this.tasksUpdated.asObservable();
  }

  getTaskById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  createTask(task: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, task);
  }

  updateTask(id: string, task: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, task);
  }

  deleteTask(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
