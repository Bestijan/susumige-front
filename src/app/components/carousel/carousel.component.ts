import { AnimationFactory, AnimationPlayer, animate, style, transition, trigger } from '@angular/animations';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input} from '@angular/core';
import { Route, Router } from '@angular/router';
import { News } from 'src/app/models/News';
import { NewsCard } from 'src/app/models/NewsCard';
import { HttpService } from 'src/app/services/http-service.service';
import { ItemsService } from 'src/app/services/items.service';
import { MoveCarouselService } from 'src/app/services/move-carousel.service';
import { NewsRepositoryService } from 'src/app/services/news-repository.service';
import { SlidePausedService } from 'src/app/services/slide-paused.service';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
  animations: [
    trigger('carousel', [
      transition('* <=> *', [
        style({transform: 'translateX(0%)'}),
        animate(5000, style({transform: 'translate(-340px)'}))
      ])
    ])
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CarouselComponent {

  @Input()
  newsCards!: NewsCard[];

  slideCounter = 0;

  newsCardCounter = 0;

  currentIndex = 0;
  
  previousIndex = 0;

  animationPlayers: Array<AnimationPlayer> = new Array();

  intervalValue = 5 * 1000;

  pause = false;

  moveCarousel = true;

  infinite = true;

  timer: any;

  factory!: AnimationFactory;

  constructor(private cdr: ChangeDetectorRef,
              private slidePaused: SlidePausedService,
              private router: Router) {

              this.slidePaused.slideStartedSubject.subscribe(() => {
                  this.startCarousel();
              });
  }

  moveCarouselLeft() {
    this.moveElementLeft();
    this.pauseCarousel();
  }

  moveCarouselRight() {
    this.moveElementRight();
    this.pauseCarousel();
  }

  onCarouselPaused() {        
    this.slidePaused.slideSubject.next('start');
  }     

  startCarousel() {
    this.slidePaused.slideSubject.next('start');
  }

  pauseCarousel() {
    this.slidePaused.slideSubject.next('pause');
  }

  continueCarousel() {
    this.slidePaused.slideSubject.next('continue');
  }

  animationFinished(started: string) {
    if (started === 'start') {
        this.newsCardCounter++;
        if (this.newsCardCounter === this.newsCards.length) {
            this.newsCardCounter = 0;
            this.moveElementLeft();
        }
    } else if (started === 'continue') {
      this.slidePaused.slideSubject.next('continue');
    } else {
      this.slidePaused.slideSubject.next('pause');
    }
  }  
  
  moveElementLeft() {
    const firstCard = this.newsCards[0];
    this.newsCards.shift();
    this.newsCards.push(firstCard);
    this.startCarousel();
    this.cdr.detectChanges();
  }

  moveElementRight() {
    const lastCard = this.newsCards[this.newsCards.length - 1];
    this.newsCards.pop();
    this.newsCards.unshift(lastCard);
    this.startCarousel();
    this.cdr.detectChanges();
  }

  clickOnCard(newsId: string) {
    this.router.navigate(['news/' + newsId]);
  }

  trackByNews(id: number, news: NewsCard): string {
      return news ? news.newsId : '';
  }
}

