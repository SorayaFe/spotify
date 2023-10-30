import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'artistsNames',
})
export class ArtistsNamesPipe implements PipeTransform {
  transform(value: any[]): string {
    return value.map((a) => a.name).join(', ');
  }
}
