import { Component, Input, OnInit } from '@angular/core';
import { Task } from 'src/app/models/task';
import { TaskService } from 'src/app/services/task.service';


@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})


export class TaskComponent implements OnInit {
  @Input() projectId!: string;
  tasks: Task[] = [];
  isLoading = true;

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks() {
    this.taskService.getTasksByProject(this.projectId).subscribe((tasks) => {
      this.tasks = tasks;
      this.isLoading = false;
    });
  }
}
