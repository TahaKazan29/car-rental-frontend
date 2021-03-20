import { Pipe, PipeTransform } from '@angular/core';
import { Brand } from 'src/app/models/brand';

@Pipe({
  name: 'brandFilter'
})
export class BrandFilterPipe implements PipeTransform {

  transform(value: Brand[],filterText:string): Brand[] {
    filterText = filterText ? filterText.toLocaleLowerCase():"";
    return filterText ? value.filter((c:Brand) => c.name.toLocaleLowerCase().indexOf(filterText)!== -1) : value;
  }

}
