import { Pipe, PipeTransform } from '@angular/core';
import {DomSanitizer} from "@angular/platform-browser";

@Pipe({
  name: 'safe'
})
export class SafePipe implements PipeTransform {

  constructor(private sanitizer: DomSanitizer) { }
  
  transform(url: string) {
    const videoURL = (url.split("?")[0] + '/').replace('watch', 'embed') + 
                      url.substring(url.indexOf('=') + 1, url.indexOf('&'));
    return this.sanitizer.bypassSecurityTrustResourceUrl(videoURL);
  }
}