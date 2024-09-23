import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LeftsideCardsService {

  private leftsideCardsSubject: Subject<any> = new Subject();

  constructor() { }

  get leftSideCards(): Subject<any> {
      return this.leftsideCardsSubject;
  }
}
