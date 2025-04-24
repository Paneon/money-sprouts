import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'formatUrl',
    standalone: true,
})
export class FormatUrlPipe implements PipeTransform {
    transform(value: string | null): string {
        if (!value) {
            return '';
        }
        return value;
    }
}
