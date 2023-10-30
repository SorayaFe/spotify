import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeRangeMonths',
})
export class TimeRangeMonthsPipe implements PipeTransform {
  transform(value: string | null): string {
    switch (value) {
      case 'short_term':
        return '4 Wochen';
      case 'medium_term':
        return '6 Monate';
      case 'long_term':
        return 'Jahre';
    }

    return '';
  }
}
