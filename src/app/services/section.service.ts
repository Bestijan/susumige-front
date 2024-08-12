import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SectionService {

  private sectionSubject: Subject<any> = new Subject();

  constructor() { }

  get section(): Subject<any> {
      return this.sectionSubject;
  }
}
