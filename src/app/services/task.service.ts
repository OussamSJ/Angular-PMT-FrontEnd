import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Task } from '../models/task';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  tasks: Task[] = [];

  constructor(private apiService: ApiService) {}

  getTasksByProject(projectId: string) {
    return this.apiService.getTasksByProject(projectId).pipe(
      tap((tasks: Task[]) => {
        this.tasks = tasks;
      })
    );
  }

  addTaskToProject(projectId: string, task: Task) {
    return this.apiService.addTaskToProject(projectId, task);
  }

  modifyTask(id: string,task: Task) {
    return this.apiService.modifyTask(id, task);
  }
}
