import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NewsCard } from 'src/app/models/NewsCard';
import { NewsRepositoryService } from 'src/app/services/news-repository.service';

const START = 3;
const OFFSET = 1;
const THRESHOLD = 25;

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements AfterViewInit {

  @ViewChild(CdkVirtualScrollViewport) virtualScroll!: CdkVirtualScrollViewport;

  cardsToShow = new Array<NewsCard>();

  start = 0;

  end = 3;

  constructor(private newsRepo: NewsRepositoryService,
              private router: Router) {
  }

  ngAfterViewInit(): void {
    this.newsRepo.cardsExists.subscribe((news: NewsCard[]) => {
        this.cardsToShow = news;
    });
  }

  getNews(newsId: string) {
    this.router.navigate(['news/' + newsId]);
  }

  onScroll() {
    const offset = this.virtualScroll.measureScrollOffset();
    const viewHeight = this.virtualScroll.getViewportSize();
    const totalHeight = this.virtualScroll.measureRenderedContentSize();

    if (offset + viewHeight >= totalHeight - THRESHOLD && this.end < this.cards.length) {
      if (this.end > this.cardsToShow.length) {
          this.start -= OFFSET;
          this.end -= OFFSET;
      } else {
          this.start += OFFSET;
          this.end += OFFSET;
      }
      this.cardsToShow = this.cards.slice(this.start, this.end);
      this.virtualScroll.elementRef.nativeElement.scrollTop = 10;
    } else if (offset < 10 && this.start > 0) {
      if (this.start < 0) {
          this.start += OFFSET;
          this.end = START;
      } else {
          this.start -= OFFSET;
          this.end -= OFFSET;
      }
      this.cardsToShow = this.cards.slice(this.start, this.end);
      this.virtualScroll.elementRef.nativeElement.scrollTop = 50;
    }
  }

  get cards(): NewsCard[] {
      return this.newsRepo.mainCards;
  }

  get mobileView(): boolean {
    return window.innerWidth <= 900;
  }

}
