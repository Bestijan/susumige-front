import { ElementRef, Injectable, Input } from '@angular/core';
import './../extensions/replace-at';

@Injectable({
  providedIn: 'root'
})
export class TextService {

  @Input()
  private tn!: ElementRef;

  private position = 0;

  constructor() { }

  setText(letter: string) {
    const offset = this.textNews.nativeElement.selectionStart + 1;
    this.textNews.nativeElement.value = 
    this.textNews.nativeElement.value.replaceAt(this.textNews.nativeElement.selectionStart, letter);
    if (this.position > offset) {
        this.textNews.nativeElement.focus();
        this.position = this.textNews.nativeElement.selectionStart + 1;
        this.textNews.nativeElement.setSelectionRange(offset, offset);
    } else {
        this.position = this.textNews.nativeElement.selectionStart + 1;
        this.textNews.nativeElement.setSelectionRange(this.position, this.position);
    }
  }

  set textNews(textNews: ElementRef) {
      this.tn = textNews;
  }

  get textNews(): ElementRef {
      return this.tn;
  }

}
