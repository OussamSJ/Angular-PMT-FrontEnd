import { TestBed } from '@angular/core/testing';
import { TaskService } from './task.service';
import { ApiService } from './api.service';
import { of } from 'rxjs';
import { Task } from '../models/task';

describe('TaskService', () => {
  let service: TaskService;
  let apiServiceSpy: jasmine.SpyObj<ApiService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('ApiService', ['getTasksByProject', 'addTaskToProject', 'modifyTask']);

    TestBed.configureTestingModule({
      providers: [
        TaskService,
        { provide: ApiService, useValue: spy }
      ],
    });

    service = TestBed.inject(TaskService);
    apiServiceSpy = TestBed.inject(ApiService) as jasmine.SpyObj<ApiService>;
  });

  it('doit être créé', () => {
    expect(service).toBeTruthy();
  });

  describe('getTasksByProject', () => {
    it('devrait récupérer des tâches pour un projet spécifique', (done) => {
      const mockTasks: Task[] = [
        {title: 'Tâche 1', description: 'Tâche 1', priority: 'Low', id: '', status: '', startDate: new Date(), endDate: new Date()},
        {title: 'Tâche 2', description: 'Tâche 2', priority: 'Low', id: '', status: '', startDate: new Date(), endDate: new Date()},
      ];
      apiServiceSpy.getTasksByProject.and.returnValue(of(mockTasks));

      service.getTasksByProject('Project Alpha').subscribe((tasks) => {
        expect(tasks).toEqual(mockTasks);
        expect(service.tasks).toEqual(mockTasks); // Vérifie que la liste interne est mise à jour
        done();
      });

      expect(apiServiceSpy.getTasksByProject).toHaveBeenCalledWith('Project Alpha');
    });
  });

 

  describe('modifyTask', () => {
    it('devrait modifier une tâche existante', (done) => {
      const updatedTask: Task = { title: 'Tâche 1', description: 'Tâche 1', priority: 'Low', id: '', status: '', startDate: new Date(), endDate: new Date()};
      apiServiceSpy.modifyTask.and.returnValue(of(updatedTask));

      service.modifyTask('1', updatedTask).subscribe((task) => {
        expect(task).toEqual(updatedTask);
        done();
      });

      expect(apiServiceSpy.modifyTask).toHaveBeenCalledWith('1', updatedTask);
    });
  });
});
