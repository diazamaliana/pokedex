import { Component, OnInit } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { PokemonDetail } from 'src/app/models/pokemon-detail';
import { PokemonList } from 'src/app/models/pokemon-list';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-pokemon-card',
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.scss']
})
export class PokemonCardComponent implements OnInit {
  private offset!: number;

  pokemons: PokemonDetail[] = [];

  constructor(private pokemonService: PokemonService) {
    this.offset = 0;
  }

  ngOnInit(): void {
    this.getPokemonList(this.offset);
  }

  getPokemonList(offset: number) {
    this.pokemonService.getAllPokemons(offset)
      .subscribe((list: PokemonList[]) => {
        this.getPokemon(list);
      });
  }

  private getPokemon(list: PokemonList[]) {
    const arr: Observable<PokemonDetail>[] = [];
    list.map((value: PokemonList) => {
      arr.push(
        this.pokemonService.getPokemonDetail(value.name)
      );
    });

    forkJoin([...arr]).subscribe((pokemons: PokemonDetail[]) => {
      this.pokemons.push(...pokemons);
    });
  }

  onDetail(pokemon: PokemonDetail): void {
    console.log(pokemon);
  }
}
