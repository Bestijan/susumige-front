import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  private category: Subject<string> = new Subject();

  constructor() { }

  get categorySubject(): Subject<string> {
      return this.category;
  }
}
