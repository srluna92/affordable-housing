import { Injectable } from '@angular/core';
import { ErrorMessages } from '../../properties/error-messages';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class MainService {

  error = new BehaviorSubject<string>('');

  constructor() { }

  setError(error: any): string {
    if (!!error) {
      this.error.next(!!ErrorMessages[error.toString()] ? ErrorMessages[error.toString()] : error.toString());
      return this.error.getValue();
    }
  }
}
