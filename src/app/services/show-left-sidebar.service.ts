import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShowLeftSidebarService {

  private showSidebar$: Subject<string> = new Subject();

  constructor() { }

  get showSidebar(): Subject<string> {
      return this.showSidebar$;
  }
}
