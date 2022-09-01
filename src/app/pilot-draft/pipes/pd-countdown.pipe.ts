import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pdCountdown'
})
export class PdCountdownPipe implements PipeTransform {

  transform(value: number): string {
    let hour = 0;
    let min = 0;
    let sec = 0;
    hour = Math.floor(value / 3600);
    min = Math.floor((value % 3600) / 60);
    sec = value % 60;
    if (value < 0) {
      return '00:00:00';
    } else {
      let hStr = '';
      if (hour > 9) {
        hStr = hour + '';
      } else {
        hStr = '0' + hour; 
      }
      let mStr = '0' + min;
      let sStr = '0' + sec;
      return [hStr, mStr.substring(mStr.length-2, mStr.length), sStr.substring(sStr.length-2, sStr.length)].join(':');
    }
  }

}
