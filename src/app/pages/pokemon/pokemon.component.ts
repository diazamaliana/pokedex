import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { forkJoin, Observable } from 'rxjs';
import { PokemonDetailComponent } from 'src/app/components/pokemon-detail/pokemon-detail.component';
import { PokemonDetail } from 'src/app/models/pokemon-detail';
import { PokemonList } from 'src/app/models/pokemon-list';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.scss']
})
export class PokemonComponent implements OnInit {

  private offset!: number;
  searchModel!: string;

  pokemons: PokemonDetail[] = [];
  searchPokemon: PokemonDetail = new PokemonDetail();
  search: FormControl = new FormControl('');

  constructor(private pokemonService: PokemonService,
    private modalDetail: NgbModal,
    ) {
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
    const detailModalRef = this.modalDetail.open(PokemonDetailComponent, 
      { centered: true,
        size: 'md',
    });
    detailModalRef.componentInstance.pokemon = pokemon;
    console.log(pokemon);
  }

  loadMore() {
    //this.isLoading = true;
    this.getPokemonList(this.offset += 24);
  }
}
