import { Injectable } from '@angular/core';
import { INewsItem } from '../interfaces/INewsItem';
import { TextImage } from '../models/TextImage';
import { TextLink } from '../models/TextLink';
import { YouTubeLink } from '../models/YouTubeLink';
import { Text } from '../models/Text';

@Injectable({
  providedIn: 'root'
})
export class CheckNewsItemService {

  constructor() { }

  getNewsItemType(newsItem: INewsItem): string {
    switch(true) {
      case (newsItem instanceof Text) : {
        return 'text';
      }
      case (newsItem instanceof TextLink) : {
        return 'link';
      }
      case (newsItem instanceof YouTubeLink): {
        return 'ytlink';
      }
      case (newsItem instanceof TextImage) : {
        return 'image';
      }
      default: {
        return 'text';
      }
    }
  }

  getIsEmpty(newsItem: INewsItem): boolean {
    switch(true) {
      case (newsItem instanceof Text): {
        return (<Text>newsItem).text === '';
      }
      case (newsItem instanceof TextLink): {
        return (<TextLink>newsItem).link === '';
      }
      case (newsItem instanceof YouTubeLink): {
        return (<YouTubeLink>newsItem).link === '';
      }
      case (newsItem instanceof TextImage): {
        return (<TextImage>newsItem).fileAsBase64 === '';
      }
      default: {
        return true;
      }
    }
  }

  convertNewsItem(newsItem: INewsItem): Text | TextLink | TextImage {
    switch(this.getNewsItemType(newsItem)) {
          case 'text': {
            return (<Text>newsItem);
          }
          case 'link': {
            return (<TextLink>newsItem);
          }
          case 'ytlink': {
            return (<YouTubeLink>newsItem);
          }
          case 'image': {
            return (<TextImage>newsItem);
          }
          default: {
            return (<Text>newsItem);
          }
    }
  }

  convertToText(newsItem: INewsItem): Text {
    return <Text>newsItem;
  }

  convertToLink(newsItem: INewsItem): TextLink {
    return <TextLink>newsItem;
  }

  convertToImage(newsItem: INewsItem): TextImage {
    return <TextImage>newsItem;
  }
}
