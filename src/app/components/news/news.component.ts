import { AfterViewInit, Component } from '@angular/core';
import { INewsItem } from 'src/app/interfaces/INewsItem';
import { Comment } from 'src/app/models/Comment';
import { News } from 'src/app/models/News';
import { User } from 'src/app/models/User';
import { CheckNewsItemService } from 'src/app/services/check-news-item.service';
import { NewsRepositoryService } from 'src/app/services/news-repository.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements AfterViewInit {

  loading = true;  

  constructor(private newsRepo: NewsRepositoryService,
              private checkItemSvc: CheckNewsItemService) {
  }

  ngAfterViewInit(): void {
    this.loading = true;
    this.newsRepo.currentNewsObserver.subscribe(() => {
        if (this.news) {
            this.loading = false;
        }
    });
  }

  get news(): News | null {
      return this.newsRepo.currentNews;
  }

  get user(): User {
      return this.newsRepo.socialUser!;
  }

  get checkItem(): CheckNewsItemService {
      return this.checkItemSvc;
  }

  get title(): string {
      return this.news ? this.news!.title : ''; 
  }

  get fileAsBase64(): string | ArrayBuffer {
    return this.news ? this.news!.thumbnail.fileAsBase64 : ''; 
  }

  get source(): string {
      return this.news ? this.news!.thumbnail.source : '';
  }

  get snipet(): string {
      return this.news ? this.news!.snipet : '';
  }

  get section(): string {
      return this.news ? this.news!.section : '';
  }

  get nick(): string {
      return this.news ? this.news!.nick : '';
  }

  get date(): Date | null {
      return this.news ? this.news!.date : null;
  }

  get views(): number {
      return this.news ? this.news!.views : 0;
  }

  get likesNum(): number {
      return this.news ? this.news!.likesNum : 0;
  }

  get commentsNum(): number {
      return this.news ? this.news!.commentsNum : 0;
  }

  get newsItems(): INewsItem[] {
      return this.news ? this.news!.news : [];
  }

  get newsId(): string {
      return this.news ? this.news!.newsId : '';
  }

  get comments(): Comment[] {
      return this.news ? this.news!.comments : [];
  }

}
