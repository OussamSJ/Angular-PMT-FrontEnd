import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { TaskComponent } from './tasks.component';
import { TaskService } from 'src/app/services/task.service';
import { UserService } from 'src/app/services/user.service';
import { of } from 'rxjs';
import { Task } from 'src/app/models/task';

describe('TaskComponent', () => {
  let component: TaskComponent;
  let fixture: ComponentFixture<TaskComponent>;
  let taskServiceSpy: jasmine.SpyObj<TaskService>;
  let userServiceSpy: jasmine.SpyObj<UserService>;

  beforeEach(async () => {
    // Création des mocks pour TaskService et UserService
    const taskServiceMock = jasmine.createSpyObj('TaskService', ['getTasksByProject', 'addTaskToProject', 'modifyTask']);
    const userServiceMock = jasmine.createSpyObj('UserService', ['getCurrentUserEmail']);

    await TestBed.configureTestingModule({
      declarations: [TaskComponent],
      imports: [ReactiveFormsModule], // Pour les formulaires réactifs
      providers: [
        { provide: TaskService, useValue: taskServiceMock },
        { provide: UserService, useValue: userServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TaskComponent);
    component = fixture.componentInstance;
    taskServiceSpy = TestBed.inject(TaskService) as jasmine.SpyObj<TaskService>;
    userServiceSpy = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;
  });

  it('devrait créer le composant', () => {
    expect(component).toBeTruthy();
  });

  describe('loadTasks', () => {
    it('devrait charger les tâches et les classer par priorité', () => {
      const mockTasks: Task[] = [
        { id: '1', title: 'Tâche 1', description: 'Desc 1', priority: 'high', status: 'pending', startDate: new Date(), endDate: new Date() },
        { id: '2', title: 'Tâche 2', description: 'Desc 2', priority: 'medium', status: 'pending', startDate: new Date(), endDate: new Date() },
        { id: '3', title: 'Tâche 3', description: 'Desc 3', priority: 'low', status: 'terminee', startDate: new Date(), endDate: new Date() },
      ];

      taskServiceSpy.getTasksByProject.and.returnValue(of(mockTasks));

      component.loadTasks();

      expect(taskServiceSpy.getTasksByProject).toHaveBeenCalledWith(component.projectId);
      expect(component.highPriorityTasks.length).toBe(1);
      expect(component.mediumPriorityTasks.length).toBe(1);
      expect(component.lowPriorityTasks.length).toBe(0);
      expect(component.completedTasks.length).toBe(1);
    });
  });

 

  describe('markAsCompleted', () => {
    it('devrait déplacer une tâche vers les tâches terminées', () => {
      const task: Task = { id: '1', title: 'Tâche à terminer', description: '', priority: 'medium', status: 'pending', startDate: new Date(), endDate: new Date() };

      component.mediumPriorityTasks = [task];
      taskServiceSpy.modifyTask.and.returnValue(of(task));

      component.markAsCompleted(task);

      expect(component.mediumPriorityTasks.length).toBe(0);
      expect(component.completedTasks.length).toBe(1);
      expect(taskServiceSpy.modifyTask).toHaveBeenCalledWith(task.id, jasmine.objectContaining(task));
    });
  });

  describe('Form Validation', () => {
    it('devrait invalider le formulaire si les champs sont vides', () => {
      component.taskForm.setValue({
        title: '',
        description: '',
        priority: '',
        startDate: '',
        endDate: '',
      });

      expect(component.taskForm.valid).toBeFalse();
    });

    it('devrait valider le formulaire si tous les champs sont remplis', () => {
      component.taskForm.setValue({
        title: 'Tâche valide',
        description: 'Description valide',
        priority: 'medium',
        startDate: new Date(),
        endDate: new Date(),
      });

      expect(component.taskForm.valid).toBeTrue();
    });
  });
});
