import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TaskService } from '../../services/task.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-task-create',
  templateUrl: './task-create.component.html',
  styleUrls: ['./task-create.component.css'],
})
export class TaskCreateComponent implements OnInit {
  taskForm: FormGroup;
  taskId: string;
  isEditMode: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private taskService: TaskService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.taskForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.taskId = this.route.snapshot.paramMap.get('postId');
    if (this.taskId) {
      this.isEditMode = true;
      this.taskService.getTaskById(this.taskId).subscribe(
        (task) => {
          this.taskForm.patchValue(task);
        },
        (error) => {
          console.error('Error fetching task:', error);
        }
      );
    }
  }

  onSubmit() {
    if (this.taskForm.valid) {
      const taskData = this.taskForm.value;
      if (this.isEditMode) {
        this.taskService.updateTask(this.taskId, taskData).subscribe(
          (response) => {
            console.log('Task updated successfully:', response);
            this.router.navigate(['/']);
          },
          (error) => {
            console.error('Error updating task:', error);
          }
        );
      } else {
        this.taskService.createTask(taskData).subscribe(
          (response) => {
            console.log('Task created successfully:', response);
            this.router.navigate(['/']);
          },
          (error) => {
            console.error('Error creating task:', error);
          }
        );
      }
    }
  }
}
