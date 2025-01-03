import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Task } from 'src/app/models/task';
import { TaskService } from 'src/app/services/task.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import emailjs from '@emailjs/browser';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})


export class TaskComponent implements OnInit, OnChanges {
  @Input() projectId!: string;
  @Input() index!: number;
  @Input() tasks: Task[] = [];
  @Input() user: User;
  isLoading = true;
  highPriorityTasks: Task[] = [];
  mediumPriorityTasks: Task[] = [];
  lowPriorityTasks: Task[] = [];
  completedTasks: any[] = [];
  taskForm: FormGroup;
  constructor(private fb: FormBuilder,private taskService: TaskService) {
    this.taskForm = this.fb.group({ 
      title: ['', Validators.required], 
      description: ['', Validators.required], 
      priority: ['', Validators.required], 
      startDate: ['', Validators.required], 
      endDate: ['', Validators.required] });
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.loadTasks();
  }

  ngOnInit(): void {
    this.loadTasks();
   
  }
  onSubmit() { 
    if (this.taskForm.valid) { 
      const newTask: Task = { 
        id: '', // Assurer que le backend attribue un ID unique
        title: this.taskForm.value.title, 
        description: this.taskForm.value.description, 
        priority: this.taskForm.value.priority, 
        status: 'pending', 
        startDate: new Date(this.taskForm.value.startDate), 
        endDate: new Date(this.taskForm.value.endDate) 
      }; 

   this.send();
  
      this.taskService.addTaskToProject(this.projectId, newTask).subscribe(response => { 
        console.log('Task added successfully', response);  
  
        // Recharge les tâches après l'ajout
        this.loadTasks();
  
        // Réinitialise le formulaire après l'ajout
        this.taskForm.reset(); 
      }, error => {
        console.error('Failed to add task', error);
      });
    } 
  }
  
  
  markAsCompleted(task: Task) {
  
    // Add task to completed tasks
    this.completedTasks.push(task);
   
    // Remove task from the current priority list
    this.highPriorityTasks = this.highPriorityTasks.filter(t => t !== task);
    this.mediumPriorityTasks = this.mediumPriorityTasks.filter(t => t !== task);
    this.lowPriorityTasks = this.lowPriorityTasks.filter(t => t !== task);
  
    this.taskService.modifyTask(task.id, task).subscribe(response => {
      // Traitez la réponse si nécessaire
  }, error => {
      console.error('Erreur lors de la mise à jour de la tâche', error);
  });
  
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

  send(){
    emailjs.init('DKSIxFpd_pd32N-Za');
    emailjs.send("service_w3w2q29","pmt",{
      title: this.taskForm.value.title,
      to_name: ,
      Project: this.projectId,
      endDate: this.taskForm.value.endDate,
      priority: this.taskForm.value.priority,
      description: this.taskForm.value.description,
      });
  
  
  
  };
}
