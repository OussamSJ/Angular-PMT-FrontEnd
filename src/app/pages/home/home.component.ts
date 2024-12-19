import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { delay } from 'rxjs';
import { Pokemon } from 'src/app/models/pokemon';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  addForm!: FormGroup;
  pokemons: Pokemon[] = [];
  isLoading = false;

  constructor(
    private pokemonService: PokemonService,
    private router: Router,
  ) {
    this.createForm();
    this.getPokemons();
  }

  private createForm() {
    const today = new Date().toISOString().split('T')[0];
   
    this.addForm = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      description:  new FormControl(null, [Validators.required]),
      debutDate: new FormControl(today, [ Validators.required]),
      finDate: new FormControl(today, [ Validators.required]),
    });
  }

  getPokemons() {
    this.isLoading = true;
    this.pokemonService.getPokemons()
    .pipe(
      delay(2000)
    )
    .subscribe((pokemons: Pokemon[]) => {
      this.pokemons = pokemons;
      this.isLoading = false;
    });
  }

  onSubmit() {
    this.addForm.markAllAsTouched();
    if (this.addForm.invalid) return;
    this.pokemonService.addPokemon(this.addForm.value.name, this.addForm.value.description, this.addForm.value.debutDate,this.addForm.value.finDate);
    this.addForm.reset();
    this.pokemonService.getPokemons();
  }

  onDeletePokemonClick(index: number) {
    this.pokemonService.deletePokemon(index);
  }

  goToPokemonPage(index: number) {
    this.router.navigate(['pokemon', this.pokemons[index].id], {
      state: {
        pokemon: this.pokemons[index],
      }
    });
  }

  get name() {
    return this.addForm.get('name') as FormControl;
  }
  get description () {
    return this.addForm.get('description') as FormControl;
  }
  get debutDate() {
    return this.addForm.get('debutDate') as FormControl;
  }
  get finDate() {
    return this.addForm.get('finDate') as FormControl;
  }
 

}
