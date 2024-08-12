import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MoveCarouselService {

  private moveLeftOrRight: Subject<string> = new Subject();

  constructor() { }

  get moveCarousel(): Subject<string> {
      return this.moveLeftOrRight;
  }
}
