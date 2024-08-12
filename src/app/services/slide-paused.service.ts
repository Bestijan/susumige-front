import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SlidePausedService {

  private slidePaused: Subject<string> = new Subject();

  private slideStarted: Subject<boolean> = new Subject();

  constructor() { }

  get slideSubject(): Subject<string> {
      return this.slidePaused;
  }

  get slideStartedSubject(): Subject<boolean> {
      return this.slideStarted;
  }

}
