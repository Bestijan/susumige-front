import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateTransform'
})
export class DateTransformPipe implements PipeTransform {

  months = ['Јан', 'Феб', 'Мар', 'Апр', 'Мај', 'Јун', 'Јул', 'Авг', 'Сеп', 'Окт', 'Нов', 'Дец'];

  transform(date: Date | null): string {
    return date ? `${this.months[(new Date(date)).getUTCMonth()]} ${(new Date(date)).getUTCDate()}, ${(new Date(date)).getUTCFullYear()}` : '';
  }



}
