import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LocalPokemon } from '../models/pokemon';
import { LocalUser } from '../models/user';

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
  //private apiUrl = 'https://angular-avance-65c17-default-rtdb.europe-west1.firebasedatabase.app';
  private apiUrl1 = 'http://localhost:8080';
  constructor(private http: HttpClient) { }

  postPokemon(pokemon: LocalPokemon) {
    return this.http.post<PostResult>(`${this.apiUrl1}/projet`, pokemon);
  }

  getPokemon(id: string) {
    return this.http.get<LocalPokemon>(`${this.apiUrl1}/projet/${id}`);
  }

  getPokemons() {
    return this.http.get<GetPokemonsResult>(`${this.apiUrl1}/projets`);
  }

  deletePokemon(id: string) {
    return this.http.delete(`${this.apiUrl1}/projet/${id}`);
  }

  postUser(user: LocalUser) {
    return this.http.post<PostResult>(`${this.apiUrl1}/user`, user);
  }

  getUsers() {
    return this.http.get<GetUsersResult>(`${this.apiUrl1}/users`);
  }
}
