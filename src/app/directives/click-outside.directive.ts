import { Directive, EventEmitter, HostBinding, HostListener, Input, Output } from '@angular/core';
import { Subject } from 'rxjs';

@Directive({
  selector: '[appClickOutside]'
})
export class ClickOutsideDirective {

  @Input()
  e!: string;

  @Input()
  container!: string;

  element!: HTMLElement;

  wrapper!: HTMLElement;

  containerElement!: HTMLElement;

  @Output()
  outsideEmitter: EventEmitter<boolean> = new EventEmitter();

  constructor() { }

  @HostListener('window:click', ['$event'])
  clickOutside(event: PointerEvent) {
    this.element = (event.target as HTMLElement)!;  
    if (this.container && this.container !== '') {
        this.containerElement = document.getElementById(this.container)!;
    }
    if (this.e && this.e !== '') {
        this.wrapper = document.getElementById(this.e)!;
    }
    if (this.containerElement && this.wrapper && !this.containerElement.contains(this.element) && !this.wrapper.contains(this.element)) {
        this.outsideEmitter.emit(false);
    }
  }

}
