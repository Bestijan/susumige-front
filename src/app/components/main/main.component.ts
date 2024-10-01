import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { AfterViewInit, ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { NewsCard } from 'src/app/models/NewsCard';
import { HttpService } from 'src/app/services/http-service.service';
import { NewsRepositoryService } from 'src/app/services/news-repository.service';
import { SectionService } from 'src/app/services/section.service';

const THRESHOLD = 25;

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements AfterViewInit {

  loading = true;

  spinner = false;

  bottomReached = false;

  topReached = false;

  @ViewChild(CdkVirtualScrollViewport) virtualScroll!: CdkVirtualScrollViewport;

  cardsToShow = new Array<NewsCard>();

  newsCards = new Array<NewsCard>();

  start = 0;

  end = 3;

  constructor(private newsRepo: NewsRepositoryService,
              private router: Router,
              private sectionSvc: SectionService,
              private httpSvc: HttpService,
              private cdr: ChangeDetectorRef) {
  }

  ngAfterViewInit(): void {
    if (this.mobileView) {
        this.mobileViewNews();
    } else  {
      this.newsRepo.cardsExists.subscribe((news: NewsCard[]) => {
        this.cardsToShow = news;
        this.sectionSvc.sectionLoading.next(false);
      });
    }
  }

  private mobileViewNews() {
    this.httpSvc.getMobileViewNews().subscribe((news: NewsCard[]) => {
        this.cardsToShow = news;
    });
  }

  getNews(newsId: string) {
    this.router.navigate(['news/' + newsId]);
    this.newsRepo.currentNewsObserver.next(null);
  }

  private loadOlderCards() {
    this.spinner = true;
    this.newsRepo.dateLeftSidebar = new Date(this.cardsToShow[0].date).toUTCString();
    this.httpSvc.getOlderNews()
        .subscribe((result: any) => {
          if (result) {
              this.setOldCards(result);
              this.topReached = false;
              this.virtualScroll.elementRef.nativeElement.scrollTop = 100;
          } else {
              this.topReached = true;
              this.bottomReached = false;
          }
          this.spinner = false;
          this.cdr.detectChanges();
        });
  }

  private loadNewerCards() {
    this.spinner = true;
    this.newsRepo.dateLeftSidebar = new Date(this.cardsToShow[this.cardsToShow.length - 1].date).toISOString();
    this.httpSvc.getNewerNews()
      .subscribe((result: any) => {
        if (result) {
            this.setNewCards(result);
            this.bottomReached = false;
            this.virtualScroll.elementRef.nativeElement.scrollTop = this.virtualScroll.elementRef.nativeElement.scrollTop - 100;
        } else {
            this.bottomReached = true;
            this.topReached = false;
        }
        this.spinner = false;
        this.cdr.detectChanges();
      });
  }

  private setNewCards(result: any) {
    if (this.cardsToShow.findIndex((lc: NewsCard) => lc.newsId === result.newsId) < 0) {
        this.cardsToShow.shift();
        this.cardsToShow.push(result);
        // this.cardsToShow = this.newsCards;
        this.loading = false;
    }
    this.spinner = false;
  }

  private setOldCards(result: any) {
    if (this.cardsToShow.findIndex((lc: NewsCard) => lc.newsId === result.newsId) < 0) {
        this.cardsToShow.unshift(result);
        this.cardsToShow.pop();
        // this.cardsToShow = this.newsCards;
        this.loading = false;
    }
    this.spinner = false;
  }

  onScroll() {
    if (!this.spinner) {
      const offset = this.virtualScroll.measureScrollOffset();
      const viewHeight = this.virtualScroll.getViewportSize();
      const totalHeight = this.virtualScroll.measureRenderedContentSize();    
      if (offset + viewHeight >= totalHeight - THRESHOLD) {
          if (!this.bottomReached) {
              this.loadNewerCards();
          }
      } else if (offset === 0) {
        if (!this.topReached) {
            this.loadOlderCards();
        }
      }
    }
  }

  get cards(): NewsCard[] {
      return this.newsRepo.mainCards;
  }

  get mobileView(): boolean {
      return window.innerWidth <= 900;
  }

  get sectionLoading(): BehaviorSubject<boolean> {
      return this.sectionSvc.sectionLoading;
  }

}
