import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
  name: 'stringTrim',
})
export class StringTrimPipe implements PipeTransform {
  transform(value: string, ...args: unknown[]): unknown {
    if (value.length > 55) {
      return `${value.slice(0, 52)}...`
    }
    return value
  }
}
