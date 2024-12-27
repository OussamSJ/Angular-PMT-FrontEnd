import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LocalPokemon } from '../models/pokemon';
import { LocalUser } from '../models/user';
import { Task } from '../models/task';

export interface PostResult {
  name: string;
}

export interface GetPokemonsResult {
  id: LocalPokemon;
}

export interface GetUsersResult {
  id: LocalUser;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl1 = 'http://localhost:8080';
  private username = 'test';
  private password = 'test';

  constructor(private http: HttpClient) {}

  private getHeaders(): { headers: HttpHeaders } {
    const auth = btoa(`${this.username}:${this.password}`); // Base64 encode "username:password"
    return {
      headers: new HttpHeaders({
        Authorization: `Basic ${auth}`
      }),
    };
  }

  postPokemon(pokemon: LocalPokemon) {
    return this.http.post<PostResult>(`${this.apiUrl1}/projet`, pokemon);
  }

  getPokemon(name: string) {
    return this.http.get<LocalPokemon>(`${this.apiUrl1}/projet/${name}`);
  }

  getPokemons() {
    return this.http.get<GetPokemonsResult>(`${this.apiUrl1}/projets`);
  }

  deletePokemon(id: string) {
    const encodedId = encodeURIComponent(id);
    return this.http.delete(`${this.apiUrl1}/projet/name/${encodedId}`);
  }

  postUser(user: LocalUser) {
    return this.http.post<PostResult>(`${this.apiUrl1}/user`, user);
  }

  getUsers() {
    const auth = btoa(`${this.username}:${this.password}`); // Base64 encode "username:password"
    
    // Debugging: Log the Authorization header
    console.log({ Authorization: `Basic ${auth}` });

    // Create headers
    const headers = new HttpHeaders({ Authorization: `Basic ${auth}` });

    // Make the HTTP GET request with headers
    return this.http.get<GetUsersResult>(`${this.apiUrl1}/users`, { headers });
  }

  getTasksByProject(projectId: string) {
    const encodedName = encodeURIComponent(projectId);
    return this.http.get<Task[]>(`${this.apiUrl1}/projet/${encodedName}/tasks`);
  }

  addTaskToProject(projectId: string, task: Task) {
    return this.http.post(`${this.apiUrl1}/projet/${projectId}/task`, task);
  }
  modifyTask(id: string, task: Task) {
    const body = { ...task, status: 'terminee' };
    return this.http.put(`${this.apiUrl1}/task/${id}`, body);
}

}
