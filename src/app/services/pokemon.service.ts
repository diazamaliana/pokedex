import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";
import { environment } from 'src/environments/environment';
import { PokemonList } from '../models/pokemon-list';
import { PokemonDetail } from '../models/pokemon-detail';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private pokeUrl: string = environment.apiUrl + 'pokemon';
  private baseUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getAllPokemons(offset: number, limit: number = 24): Observable<PokemonList[]> {
    const url = `${this.pokeUrl}/?offset=` + offset + `&limit=` + limit;
    return this.http.get<PokemonList[]>(url)
    .pipe(
      map((res: any) => res.results)
    );
  }

  getPokemonDetail(id: number | string): Observable<PokemonDetail> {
    const url = `${this.pokeUrl}/` + id ;
    return this.http.get<PokemonDetail>(url);
  }

  getPokemonTypes() {
    const url = `${this.baseUrl}` + 'type' ;
    return this.http.get<PokemonList[]>(url)
    .pipe(
      map((res: any) => res.results));
  }
}
