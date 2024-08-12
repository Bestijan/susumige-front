import { Injectable } from '@angular/core';
import { NewsCard } from '../models/NewsCard';
import { News } from '../models/News';
import { User } from '../models/User';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewsRepositoryService {

  private cardsAvailable: BehaviorSubject<NewsCard[]> = new BehaviorSubject(new Array());

  private headCards = new Array<NewsCard>();

  private leftCards = new Array<NewsCard>();

  private cards = new Array<NewsCard>();

  private news!: News | null;

  private user!: User | null;

  private img!: string | ArrayBuffer | null;

  private s!: string;

  private c!: string;

  constructor() { }

  updateViews(news: News) {
    const views = news.views++;
    this.headerCards.forEach(element => {
      if (news.newsId === element.newsId) {
          element.views = views;
      }
    });
    this.leftSideCards.forEach(element => {
      if (news.newsId === element.newsId) {
          element.views = views;
      }
    });
    this.mainCards.forEach(element => {
      if (news.newsId === element.newsId) {
          element.views = views;
      }
    });
    this.currentNews!.views = views;
  }

  incCommentsNum(newsId: string) {
    const commentsNum = this.currentNews!.commentsNum++;
    this.headerCards.forEach(element => {
      if (newsId === element.newsId) {
          element.commentsNum = commentsNum;
      }
    });
    this.leftSideCards.forEach(element => {
      if (newsId === element.newsId) {
          element.commentsNum = commentsNum;
    }
    });
    this.mainCards.forEach(element => {
      if (newsId === element.newsId) {
          element.commentsNum = commentsNum;
    }
    });
  }

  updateLikesNum(newsId: string, like: boolean) {
    const likesNum = like ? this.currentNews!.likesNum++ : this.currentNews!.likesNum--;
    this.headerCards.forEach(element => {
      if (newsId === element.newsId) {
          element.likesNum = likesNum;
      }
    });
    this.leftSideCards.forEach(element => {
      if (newsId === element.newsId) {
        element.likesNum = likesNum;
      }
    });
    this.mainCards.forEach(element => {
      if (newsId === element.newsId) {
          element.likesNum = likesNum;
      }
    });
  }

  set socialUser(user: User | null) {
      this.user = user;
  }

  get socialUser(): User | null {
      return this.user;
  }

  set userImg(img: string | ArrayBuffer | null) {
      this.img = img;
  }

  get userImg(): string | ArrayBuffer | null {
      return this.img;
  }

  set section(s: string) {
      this.s = s;
  }

  get section(): string {
      return this.s;
  }

  set currentNews(n: News | null) {
      this.news = n;
  }

  get currentNews(): News | null {
      return this.news;
  }

  set mainCards(cards: NewsCard[]) {
      this.cards = cards;
  }

  get mainCards(): NewsCard[] {
      return this.cards;
  }

  get cardsExists(): BehaviorSubject<NewsCard[]> {
      return this.cardsAvailable;
  }

  set leftSideCards(lscards: NewsCard[]) {
      this.leftCards = lscards;
  }

  get leftSideCards(): NewsCard[] {
      return this.leftCards;
  }

  set headerCards(cards: NewsCard[]) {
      this.headCards = cards;
  }
 
  get headerCards(): NewsCard[] {
      return this.headCards;
  }

  get comment(): string {
      return this.s;
  }

  set comment(comment: string) {
      this.c = comment;
  }
}
