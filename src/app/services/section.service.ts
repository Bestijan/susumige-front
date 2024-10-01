import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SectionService {

  private sectionLoadingSubject$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  private sectionSubject$: Subject<any> = new Subject();

  constructor() { }

  get section(): Subject<any> {
      return this.sectionSubject$;
  }

  get sectionLoading(): BehaviorSubject<boolean> {
      return this.sectionLoadingSubject$;
  }
}
