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
  @Input() index!: number;
  @Input() tasks: Task[] = [];
  isLoading = true;
  highPriorityTasks: Task[] = [];
  mediumPriorityTasks: Task[] = [];
  lowPriorityTasks: Task[] = [];
  completedTasks: any[] = [];

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.loadTasks();
   
  }
  
  markAsCompleted(task: Task) {
   
  
   
   
    // Add task to completed tasks
   // this.completedTasks = this.tasks.filter(task => task.status === 'terminee');
    this.completedTasks.push(task);
   
    // Remove task from the current priority list
    this.highPriorityTasks = this.highPriorityTasks.filter(t => t !== task);
    this.mediumPriorityTasks = this.mediumPriorityTasks.filter(t => t !== task);
    this.lowPriorityTasks = this.lowPriorityTasks.filter(t => t !== task);
    //this.loadTasks();
    this.taskService.modifyTask(task.id, task);
  }

  loadTasks() {
    this.taskService.getTasksByProject(this.projectId).subscribe((tasks) => {
      this.tasks = tasks;
      this.highPriorityTasks = this.tasks.filter(task => task.priority === 'high' && task.status !== 'terminee');
      this.mediumPriorityTasks = this.tasks.filter(task => task.priority === 'medium' && task.status !== 'terminee');
      this.lowPriorityTasks = this.tasks.filter(task => task.priority === 'low' && task.status !== 'terminee');
      this.completedTasks = this.tasks.filter(task => task.status === 'terminee');
      this.isLoading = false;
    });
  }
}
