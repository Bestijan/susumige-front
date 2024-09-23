import { ElementRef, Injectable, Input } from '@angular/core';
import './../extensions/replace-at';

@Injectable({
  providedIn: 'root'
})
export class TextService {

  @Input()
  private tn!: ElementRef;

  constructor() { }

  setText(letter: string) {
    if (this.textNews.nativeElement.value.length === 1) {
        this.textNews.nativeElement.value = '';
    } else {
      this.textNews.nativeElement.value = this.textNews
                                              .nativeElement.value
                                              .slice(0, this.textNews.nativeElement.value.length - 1);
    }
    this.textNews.nativeElement.value += letter;
  }

  set textNews(textNews: ElementRef) {
      this.tn = textNews;
  }

  get textNews(): ElementRef {
      return this.tn;
  }

}
