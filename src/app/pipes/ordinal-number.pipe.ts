import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ordinalNumber',
  standalone: true
})
export class OrdinalNumberPipe implements PipeTransform {

  transform(value: number): string {
    let suffix = 'th';
    let position = value.toString();

    switch (position[position.length - 1])
    {
      case '1':
        suffix = 'st';
        break;
      case '2':
        suffix = 'nd';
        break;
      case '3':
        suffix = 'rd';
        break;
    }

    return `${value}${suffix}`;
  }

}
