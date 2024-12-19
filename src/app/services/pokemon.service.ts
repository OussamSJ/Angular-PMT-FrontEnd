import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs';
import { LocalPokemon, Pokemon} from '../models/pokemon';
import {
  ApiService,
  GetPokemonsResult,
  PostResult,
} from './api.service';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  static STORAGE_POKEMON_KEY = 'pokemons';
  pokemons: Pokemon[] = [];

  constructor(private apiService: ApiService) {}

  addPokemon( name: string, description: string, debutDate : Date, finDate:Date  ) {
    const newLocalPokemon: LocalPokemon = {
  
      name,
      description,
      debutDate,
      finDate,
      creationDate: new Date(),
    };

    this.apiService
      .postPokemon(newLocalPokemon)
      .subscribe((res: PostResult) => {
        const newPokemon: Pokemon = {
          ...newLocalPokemon,
          id: res.name,
        };
        this.pokemons.push(newPokemon);
      });
  }

  getPokemon(id: string) {
    return this.apiService.getPokemon(id)
    .pipe(
      map((pokemon: LocalPokemon) => {
        return {
          ...pokemon,
          id
        }
      })
    )
  }

  getPokemons() {
    return this.apiService.getPokemons()
    .pipe(
      map((res: GetPokemonsResult) => {
        const pokemons: Pokemon[] = [];
        if (!res) return [];
        Object.entries(res).forEach(([id, pokemon]) => {
          pokemons.push({
            ...pokemon,
            id,
          });
        });
        return pokemons;
      }),
      tap((pokemons: Pokemon[]) => {
        this.pokemons = pokemons;
      })
    );
  }

  deletePokemon(index: number) {
    this.apiService.deletePokemon(this.pokemons[index].id).subscribe();
    this.pokemons.splice(index, 1);
  }

  
}
