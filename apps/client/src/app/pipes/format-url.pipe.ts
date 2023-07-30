import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'formatUrl' })
export class FormatUrlPipe implements PipeTransform {
  transform(value: string): string {
    return `${value}`;
  }
}
