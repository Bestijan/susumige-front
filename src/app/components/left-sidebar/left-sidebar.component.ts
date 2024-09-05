import { trigger, state, style, transition, animate } from '@angular/animations';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NewsCard } from 'src/app/models/NewsCard';
import { HttpService } from 'src/app/services/http-service.service';
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
        state('closed', style({ transform : 'translateX(-100%)', zIndex: '1', position: 'absolute', visibility: 'hidden'})),
        state('open', style({ transform: 'translateX(0%)', zIndex: '1', position: 'absolute' })),
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

  start = 0;
  
  end = 3;

  cards = new Array<NewsCard>();

  currentCards = new Array<NewsCard>();

  constructor(private newsRepo: NewsRepositoryService,
              private router: Router,
              private showSidebar: ShowLeftSidebarService,
              private cdr: ChangeDetectorRef,
              private httpSvc: HttpService,
              private updateInfoSvc: UpdateInfoService
    ) {
    
    this.showSidebar.showSidebar.subscribe((value) => {
      this.open = value;
    });

    if (this.isLeftSideVisible) {
        this.open = 'closed';
    }

    this.spinner = true;
    this.httpSvc.getAllNewsLeftSidebar().subscribe((result: any) => {
      this.newsRepo.leftSideCards.push(...result);
      this.cards = this.leftCards.slice(this.start, this.end);
      this.spinner = false;
      this.loading = false;
      this.cdr.detectChanges();
    });

    this.updateInfoSvc.updateInfoService.subscribe(() => {
        this.cdr.detectChanges();
    });
  }

  onScroll(event: any) {
    const offset = this.virtualScroll.measureScrollOffset();
    const viewHeight = this.virtualScroll.getViewportSize();
    const totalHeight = this.virtualScroll.measureRenderedContentSize();

    if (offset + viewHeight >= totalHeight - THRESHOLD && this.end < this.leftCards.length) {
      if (this.end > this.leftCards.length) {
          this.start -= OFFSET;
          this.end -= OFFSET;
      } else {
          this.start += OFFSET;
          this.end += OFFSET;
      }
      this.cards = this.leftCards.slice(this.start, this.end);
      this.cdr.detectChanges();
      this.virtualScroll.elementRef.nativeElement.scrollTop = 10;
    } else if (offset < 10 && this.start > 0) {
      if (this.start < 0) {
          this.start += OFFSET;
          this.end = START;
      } else {
          this.start -= OFFSET;
          this.end -= OFFSET;
      }
      this.cards = this.leftCards.slice(this.start, this.end);
      this.cdr.detectChanges();
      this.virtualScroll.elementRef.nativeElement.scrollTop = 50;
    }
  }

  getNews(newsId: string) {
    this.router.navigate(['news/' + newsId]);
  }

  openClose() {
    this.open === '' ? this.open = 'open' : this.open === 'open' ? this.open = 'closed' : this.open = 'open';
  }

  get leftCards(): NewsCard[] {
    return this.newsRepo.leftSideCards;
  }

  get isLeftSideVisible(): boolean {
    return window.innerWidth <= 1200;
  }
}
