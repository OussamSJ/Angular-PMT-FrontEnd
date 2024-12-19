import { Component } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { catchError, delay, of } from 'rxjs';
import { Pokemon } from 'src/app/models/pokemon';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent {
  pokemon?: Pokemon;
  pokemonId?: number;
  isLoading = false;
  errorMessage?: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private pokemonService: PokemonService,
    private router: Router
  ) {
    this.getPokemonFromState();
    this.handlePageParams();
  }

  /**
   * Récupère le Pokémon depuis l'état de navigation (si disponible).
   */
  getPokemonFromState() {
    const currentNavigation = this.router.getCurrentNavigation();
    const state = currentNavigation?.extras?.state;
    if (state && 'pokemon' in state) {
      this.pokemon = state['pokemon'];
    }
  }

  /**
   * Récupère le Pokémon depuis l'API à partir de l'ID fourni.
   * @param id L'identifiant du Pokémon
   */
  getPokemonFromAPI(id: string) {
    this.isLoading = true;
    this.pokemonService
      .getPokemon(id)
      .pipe(
        delay(2000), // Ajout d'un délai simulé pour afficher un état de chargement
        catchError((error) => {
          console.error('Erreur lors de la récupération du Pokémon:', error);
          this.errorMessage = "Une erreur s'est produite lors du chargement.";
          this.isLoading = false;
          return of(undefined); // Retourne un observable vide en cas d'erreur
        })
      )
      .subscribe((pokemon: Pokemon | undefined) => {
        if (pokemon) {
          this.pokemon = pokemon;
        } else {
          this.errorMessage = "Le Pokémon demandé n'existe pas.";
        }
        this.isLoading = false;
      });
  }

  /**
   * Gère les paramètres de la page et déclenche le chargement du Pokémon.
   */
  handlePageParams() {
    this.activatedRoute.params.subscribe((params: Params) => {
      if (this.pokemon) return; // Évite une requête inutile si le Pokémon est déjà chargé
      const pokemonId = params['id'];
      if (pokemonId) {
        this.getPokemonFromAPI(pokemonId);
      } else {
        this.errorMessage = "Aucun identifiant de Pokémon fourni.";
      }
    });
  }
}
