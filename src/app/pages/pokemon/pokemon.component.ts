import { Component } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { delay } from 'rxjs';
import { Pokemon } from 'src/app/models/pokemon';
import { PokemonService } from 'src/app/services/pokemon.service';

interface PokemonTab {
  name: string;
  path: string;
}

@Component({
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.scss'],
})
export class PokemonComponent {
  pokemon?: Pokemon;
  pokemonId?: number;
  isLoading = false;

  tabs: PokemonTab[] = [{
    path: 'general',
    name: 'Général',
  }, {
    path: 'details',
    name: 'Détails',
  }]

  constructor(
    private activatedRoute: ActivatedRoute,
    private pokemonService: PokemonService,
    private router: Router,
  ) {
  
    this.getPokemonFromState();
    this.handlePageParams();
  }

  getPokemonFromState() {
    const currentNavigation = this.router.getCurrentNavigation();
    const state = currentNavigation?.extras.state;
    if (state && state['pokemon']) {
      this.pokemon = state['pokemon'];
    }
  }

  getPokemonFromAPI(id: string) {
    this.isLoading = true;
    this.pokemonService.getPokemon(id)
    .pipe(delay(2000))
    .subscribe((pokemon: Pokemon) => {
      this.pokemon = pokemon;
      this.isLoading = false;
    });
  }

  handlePageParams() {
    this.activatedRoute.params.subscribe((params: Params) => {
      if (this.pokemon) return;
      const pokemonId = params['id'];
      this.getPokemonFromAPI(pokemonId);
    });
  }
  

}
