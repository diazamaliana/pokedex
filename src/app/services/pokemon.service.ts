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
  private url: string = environment.apiUrl + 'pokemon';

  constructor(private http: HttpClient) { }

  getAllPokemons(offset: number, limit: number = 24): Observable<PokemonList[]> {
    const url = `${this.url}/?offset=` + offset + `&limit=` + limit;
    return this.http.get<PokemonList[]>(url)
    .pipe(
      map((x: any) => x.results)
    );
  }

  getPokemonDetail(id: number | string): Observable<PokemonDetail> {
    const url = `${this.url}/` + id ;
    return this.http.get<PokemonDetail>(url);
  }
}
