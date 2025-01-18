import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { PokemonComponent } from './pokemon.component';
import { PokemonService } from 'src/app/services/pokemon.service';
import { Pokemon } from 'src/app/models/pokemon';

describe('PokemonComponent', () => {
  let component: PokemonComponent;
  let fixture: ComponentFixture<PokemonComponent>;
  let pokemonServiceSpy: jasmine.SpyObj<PokemonService>;
  let routerSpy: jasmine.SpyObj<Router>;
  let activatedRouteStub: Partial<ActivatedRoute>;

  const mockPokemon: Pokemon = {
    id: '1',
    name: 'Pikachu',
    description: 'Un Pokémon électrique adorable.',
    debutDate: new Date('2023-01-01'),
    finDate: new Date('2023-12-31'),
    creationDate: new Date('2022-12-01'),
  };

  beforeEach(async () => {
    const pokemonServiceMock = jasmine.createSpyObj('PokemonService', ['getPokemon']);
    const routerMock = jasmine.createSpyObj('Router', ['getCurrentNavigation']);
    activatedRouteStub = {
      params: of({ id: '1' }),
    };

    await TestBed.configureTestingModule({
      declarations: [PokemonComponent],
      providers: [
        { provide: PokemonService, useValue: pokemonServiceMock },
        { provide: Router, useValue: routerMock },
        { provide: ActivatedRoute, useValue: activatedRouteStub },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PokemonComponent);
    component = fixture.componentInstance;
    pokemonServiceSpy = TestBed.inject(PokemonService) as jasmine.SpyObj<PokemonService>;
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });








});
