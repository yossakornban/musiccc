import { Injectable } from '@angular/core';
import * as numeral from 'numeral';

export class NumberUtils {

  public static format(value: number | string, format: string = '0,0.00'): string {
    return numeral(value).format(format);
  }

  public static parse(value: string): number {
    return numeral(value)._value;
  }
}
