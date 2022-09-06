import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';
import * as moment from 'moment';

@Pipe({
  name: 'zldate'
})
export class ZldatePipe implements PipeTransform {

  constructor(
    private datePipe: DatePipe
  ){}

  transform(value: string, format: string, region: string): string {
    let time: string = '';
    switch (region) {
      case 'local':
        time = this.datePipe.transform(moment(value).toISOString(), format) + ' L';
        break;
      case 'zulu':
        time = this.datePipe.transform(moment(value).utc().toISOString(), format) + ' Z';
        break;
      default:
        time = this.datePipe.transform(value, format);
    }
    return time;
  }

}
