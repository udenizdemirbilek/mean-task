import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TaskListComponent } from './tasks/task-list/task-list.component';
import { TaskCreateComponent } from './tasks/task-create/task-create.component';

const routes: Routes = [
  { path: '', component: TaskListComponent },
  { path: 'create', component: TaskCreateComponent },
  { path: 'edit/:postId', component: TaskCreateComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
