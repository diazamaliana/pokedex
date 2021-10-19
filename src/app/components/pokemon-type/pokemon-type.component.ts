import { Component, Input, OnInit } from '@angular/core';
import { PokemonList } from 'src/app/models/pokemon-list';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-pokemon-type',
  templateUrl: './pokemon-type.component.html',
  styleUrls: ['./pokemon-type.component.scss']
})
export class PokemonTypeComponent implements OnInit {
  pokemonTypes: PokemonList[] = [];

  constructor(private pokemonService: PokemonService,) { }

  ngOnInit(): void {
    this.getPokemonTypeList();
  }

  getPokemonTypeList(): void {
    this.pokemonService.getPokemonTypes()
    .subscribe((types) => (this.pokemonTypes = types));
  }

}
