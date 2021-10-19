import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pokemonFilter'
})
export class PokemonFilterPipe implements PipeTransform {

 transform(list: any[], filterText: string): any {
  if (!list) {
    return;
  }
  if (!filterText) {
    return list;
  }
  filterText = filterText.toLowerCase();
  return list.filter(it => {
    let hit = false;
    const keys = Object.keys(it);
    for (const key of keys) {
      if (typeof it[key] === 'string') {
        const property = it[key] as string;
        if (property.toLowerCase().includes(filterText)) {
          hit = true;
          break;
        }
      }
    }
    return hit;
   });
  }
}
