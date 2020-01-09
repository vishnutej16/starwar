import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  _characterDetailsURL: string;

  constructor() { }

  set characterDetailsURL(value: string) {
    this._characterDetailsURL = value;
  }

  get characterDetailsURL(): string {
    return this._characterDetailsURL;
  }

}
