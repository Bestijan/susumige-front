import { Directive, EventEmitter, HostListener, Output } from '@angular/core';

const OPEN_QUOTE = '„';

const CLOSED_QUOTE = '“';

const SPECIAL_CHARS = [' ', '!', '%', '?', '.', ',', ':', ';', '-', '+', '(', ')', '"', "'", '`', '*'];

const NUMBERS = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

const KEY_BOARD_EVENTS = ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Backspace', 'Delete', 'Tab'];

const PASTE = 'insertFromPaste';

@Directive({
  selector: '[appCyrilicLetter]'
})
export class CyrilicLetterDirective {

  @Output()
  cyrilicEmitter: EventEmitter<string> = new EventEmitter();

  alphabetArray = ['a', 'b', 'c', "'", ';', 'd', ']', 'e', 'f', 'g', 
                   'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 
                   'r', 's', '[', 't', 'u', 'v', 'w', 'x', 'y', "\\"];

  cyrilicArray = ['а', 'б', 'ц', "ћ", 'ч', 'д', 'ђ', 'е', 'ф', 'г', 
                  'х', 'и', 'ј', 'к', 'л', 'м', 'н', 'о', 'п', 'љ', 
                  'р', 'с', 'ш', 'т', 'у', 'в', 'њ', 'џ', 'з', 'ж'];

  latinicArray = ['a', 'b', 'c', "ć", 'č', 'd', 'đ', 'e', 'f', 'g', 
                  'x', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 
                  'r', 's', 'š', 't', 'u', 'v', 'w', 'x', 'z', 'ž'];

 alphabetArrayUpper = ['A', 'B', 'C', '"', ':', 'D', '}', 'E', 'F', 'G', 
                       'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 
                       'R', 'S', '{', 'T', 'U', 'V', 'W', 'X', 'Y', "|"];

 cyrilicArrayUpper = ['А', 'Б', 'Ц', "Ћ", 'Ч', 'Д', 'Ђ', 'Е', 'Ф', 'Г', 
                      'Х', 'И', 'Ј', 'К', 'Л', 'М', 'Н', 'О', 'П', 'Љ', 
                      'Р', 'С', 'Ш', 'Т', 'У', 'В', 'Њ', 'Џ', 'З', 'Ж'];

 latinicArrayUpper = ['A', 'B', 'C', "Ć", 'Č', 'D', 'Đ', 'E', 'F', 'G', 
                      'X', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 
                      'R', 'S', 'Š', 'T', 'U', 'V', 'W', 'X', 'Z', 'Ž'];
  
  constructor() { }

  @HostListener('input', ['$event'])
  onTypeCyrilic($event: InputEvent) {
         if (!$event.data || $event.inputType === PASTE) {
             return;
         }
         if (KEY_BOARD_EVENTS.findIndex(kbe => kbe === $event.data) >= 0) {
             return;
         }
        
        $event.preventDefault();

        if (this.alphabetArrayUpper.findIndex(a => a === $event.data) >= 0) {
             this.cyrilicEmitter.emit(this.cyrilicArrayUpper[this.alphabetArrayUpper.findIndex(a => a === $event.data)]);
         } else if (this.alphabetArray.findIndex(a => a === $event.data) >= 0) {
             this.cyrilicEmitter.emit(this.cyrilicArray[this.alphabetArray.findIndex(la => la === $event.data)]);
         } else if (this.latinicArrayUpper.findIndex(a => a === $event.data) >= 0) {
             this.cyrilicEmitter.emit(this.cyrilicArrayUpper[this.latinicArrayUpper.findIndex(la => la === $event.data)]);
         } else if (this.latinicArray.findIndex(a => a === $event.data) >= 0) {
             this.cyrilicEmitter.emit(this.cyrilicArray[this.latinicArray.findIndex(la => la === $event.data)]);
         } else if (this.cyrilicArray.findIndex(c => c === $event.data) >= 0) {
             this.cyrilicEmitter.emit($event.data);
         } else if (this.cyrilicArrayUpper.findIndex(c => c === $event.data) >= 0) {
             this.cyrilicEmitter.emit($event.data);
         } else if ($event.data) {
            if ($event.data === '_') {
                this.cyrilicEmitter.emit(OPEN_QUOTE);
            } else if ($event.data === '+') {
                this.cyrilicEmitter.emit(CLOSED_QUOTE);
            } else if (SPECIAL_CHARS.findIndex(sc => sc === $event.data) >= 0) {
                this.cyrilicEmitter.emit($event.data);
            }
        } else if (NUMBERS.findIndex(n => n === $event.data) >= 0 || SPECIAL_CHARS.findIndex(sc => sc === $event.data) >= 0) {
             this.cyrilicEmitter.emit($event.data);
        } 
  }

}
