import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UpdateInfoService {

  private updateInfoSvc: Subject<any> = new Subject();

  constructor() { }

  get updateInfoService(): Subject<any> {
      return this.updateInfoSvc;
  }
}
