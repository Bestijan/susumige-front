import { trigger, state, style, transition, animate } from '@angular/animations';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NewsCard } from 'src/app/models/NewsCard';
import { HttpService } from 'src/app/services/http-service.service';
import { LeftsideCardsService } from 'src/app/services/leftside-cards.service';
import { NewsRepositoryService } from 'src/app/services/news-repository.service';
import { ShowLeftSidebarService } from 'src/app/services/show-left-sidebar.service';
import { UpdateInfoService } from 'src/app/services/update-info.service';

const START = 3;
const OFFSET = 1;
const THRESHOLD = 25;

@Component({
  selector: 'app-left-sidebar',
  templateUrl: './left-sidebar.component.html',
  styleUrls: ['./left-sidebar.component.scss'],
  animations: [
    trigger('toggle', [
        state('closed', style({ transform : 'translateX(-100%)', display: 'block', zIndex: '1', position: 'absolute'})),
        state('open', style({ transform: 'translateX(0%)', display: 'block', zIndex: '1', position: 'absolute' })),
        transition('closed => open', animate(200)),
        transition('open => closed', animate(200))
    ])
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LeftSidebarComponent {

  loading = true;

  @ViewChild('scroller')
  scroller!: ElementRef;

  @ViewChild(CdkVirtualScrollViewport) virtualScroll!: CdkVirtualScrollViewport;

  open = '';

  spinner = false;

  bottomReached = false;

  topReached = false;

  firstDate!: Date;

  cards = new Array<NewsCard>();

  currentCards = new Array<NewsCard>();

  constructor(private newsRepo: NewsRepositoryService,
              private router: Router,
              private showSidebar: ShowLeftSidebarService,
              private cdr: ChangeDetectorRef,
              private httpSvc: HttpService,
              private updateInfoSvc: UpdateInfoService,
              private leftsideCardsSvc: LeftsideCardsService
    ) {
    
    this.setOpen();

    this.showSidebar.showSidebar.subscribe((value) => {
      this.open = value;
      this.cdr.detectChanges();
    });

    this.updateInfoSvc.updateInfoService.subscribe(() => {
        this.cdr.detectChanges();
    });

    this.leftsideCardsSvc.leftSideCards.subscribe(() => {
        this.cards = this.leftCards;
        this.loading = false;
        this.firstDate = new Date(this.newsRepo.leftSideCards[0].date);
        this.cdr.detectChanges();  
    });
  }

  private loadOlderCards() {
    this.spinner = true;
    this.newsRepo.dateLeftSidebar = new Date(this.newsRepo.leftSideCards[0].date).toUTCString();
    this.httpSvc.getOlderNewsLeftSidebar()
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
    this.newsRepo.dateLeftSidebar = new Date(this.leftCards[this.newsRepo.leftSideCards.length - 1].date).toISOString();
    this.httpSvc.getNewerNewsLeftSidebar()
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
    if (this.leftCards.findIndex((lc: NewsCard) => lc.newsId === result.newsId) < 0) {
        this.leftCards.shift();
        this.leftCards.push(result);
        this.cards = this.leftCards;
        this.loading = false;
    }
    this.spinner = false;
  }

  private setOldCards(result: any) {
    if (this.leftCards.findIndex((lc: NewsCard) => lc.newsId === result.newsId) < 0) {
        this.leftCards.unshift(result);
        this.leftCards.pop();
        this.cards = this.leftCards;
        this.loading = false;
    }
    this.spinner = false;
  }

  onScroll(event: any) {
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

  getNews(newsId: string) {
    this.router.navigate(['news/' + newsId]);
  }

  openClose() {
    this.open === '' ? this.open = 'open' : this.open === 'open' ? this.open = 'closed' : this.open = 'open';
  }

  private setOpen() {
    if (window.innerWidth < 1300) {
        this.open = 'closed';
    }
  }

  get leftCards(): NewsCard[] {
    return this.newsRepo.leftSideCards;
  }
}
