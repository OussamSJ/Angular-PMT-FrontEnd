import { TestBed, async } from '@angular/core/testing';
import { ComponentFixture } from '@angular/core/testing';
import { PokemonItemComponent } from './pokemon-item.component';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { Pokemon } from 'src/app/models/pokemon';

describe('PokemonItemComponent', () => {
  let component: PokemonItemComponent;
  let fixture: ComponentFixture<PokemonItemComponent>;
  let debugElement: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PokemonItemComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PokemonItemComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display Pokemon details', () => {
    const pokemon: Pokemon = {
      id: '1',
      name: 'Pikachu',
      description: 'Electric type Pokémon',
      debutDate: new Date('2023-01-01'),
      finDate: new Date('2023-12-31'),
      creationDate: new Date('2022-12-01')
    };
    component.pokemon = pokemon;
    fixture.detectChanges();

    const nameElement = debugElement.query(By.css('.pokemon-name')).nativeElement;
    const creationDateElement = debugElement.query(By.css('.pokemon-dates p:nth-child(1)')).nativeElement;
    const debutDateElement = debugElement.query(By.css('.pokemon-dates p:nth-child(2)')).nativeElement;
    const finDateElement = debugElement.query(By.css('.pokemon-dates p:nth-child(3)')).nativeElement;
    const descriptionElement = debugElement.query(By.css('.pokemon-description p')).nativeElement;

    expect(nameElement.textContent).toContain('Pikachu');
    expect(creationDateElement.textContent).toContain('Date de création : lundi 1 janvier 2023');
    expect(debutDateElement.textContent).toContain('Date de début : 2023-01-01');
    expect(finDateElement.textContent).toContain('Date de fin : 2023-12-31');
    expect(descriptionElement.textContent).toContain('Electric type Pokémon');
  });

  it('should emit onDelete event when delete button is clicked', () => {
    spyOn(component.onDelete, 'emit');

    const button = debugElement.query(By.css('.btn-danger')).nativeElement;
    button.click();

    expect(component.onDelete.emit).toHaveBeenCalled();
  });
});
