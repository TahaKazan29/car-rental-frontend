import { Pipe, PipeTransform } from '@angular/core';
import { Car } from 'src/app/models/car';

@Pipe({
  name: 'filterPipe'
})
export class CarFilterPipePipe implements PipeTransform {

  transform(value: Car[],filterText:string): Car[] {
    filterText = filterText ? filterText.toLocaleLowerCase():"";
    return filterText ? value.filter((c:Car) => c.description.toLocaleLowerCase().indexOf(filterText)!== -1) : value;
  }

}
