import { AnimationBuilder, AnimationPlayer, animate, keyframes, style } from '@angular/animations';
import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { NewsCard } from 'src/app/models/NewsCard';
import { SlidePausedService } from 'src/app/services/slide-paused.service';

@Component({
  selector: 'app-header-card',
  templateUrl: './header-card.component.html',
  styleUrls: ['./header-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderCardComponent implements AfterViewInit {

  @ViewChild('newsItemTo')
  newsItemTo!: ElementRef<HTMLElement>;

  @Input()
  newsCard!: NewsCard;

  @Input()
  nc!: boolean;

  @Output()
  onSlideAnimated: EventEmitter<void> = new EventEmitter();

  @Output()
  onSlidePaused: EventEmitter<string> = new EventEmitter();

  @Output()
  onSlideStarted: EventEmitter<void> = new EventEmitter();

  ap!: AnimationPlayer;

  continue = false;

  constructor(private animationBuilder: AnimationBuilder,
              private cdr: ChangeDetectorRef,
              private slideSubject: SlidePausedService) {
  }

  ngAfterViewInit(): void {
    if (!this.nc) {
        this.createAnimation();
        this.ap.play();
        this.onAnimationFinish();

        this.slideSubject.slideSubject.subscribe((playOrPause: string) => {
          switch(playOrPause) {
            case 'start': {
              this.ap.reset();
              this.ap.play();
              break;
            }
            case 'pause': {
              this.ap.pause();
              break;
            }
            case 'continue': {
              this.ap.play();
              break;
            }
          }
          this.cdr.detectChanges();
        });
      }
  }

  private createAnimation() {
    const factory = this.animationBuilder.build([
      animate('5s', keyframes([
        style({ transform: 'translateX(0)' }),
        style({ transform: 'translateX(-340px)'})
      ]))
    ]);
    this.ap = factory.create(this.newsItemTo.nativeElement);
  }

  stopAnimation() {
    this.onSlidePaused.emit('pause');
  }

  startAnimation() {
    this.onSlidePaused.emit('continue');
  }

  private onAnimationFinish() {
    this.ap.onDone((() => {
      this.onSlidePaused.emit('start');
    }));
  }

}
