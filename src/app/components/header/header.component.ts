import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { delay, distinctUntilChanged, filter, of } from 'rxjs';
import { NewsCard } from 'src/app/models/NewsCard';
import { NewsRepositoryService } from 'src/app/services/news-repository.service';
import { LanguagePopUpComponent } from '../language-pop-up/language-pop-up.component';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Router } from '@angular/router';
import { TextService } from 'src/app/services/text.service';
import { ItemsService } from 'src/app/services/items.service';
import { HttpService } from 'src/app/services/http-service.service';
import { ALL_NEWS } from 'src/app/constants/all-news';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [
    trigger('hamburgerMenu', [
      state('open', style({transform: 'translateX(0%)', zIndex: '1', position: 'absolute'})),
      state('closed', style({transform: 'translate(-100%)', zIndex: '1', position: 'absolute', marginLeft: '-10px'})),
      transition('open => closed', animate(200)),
      transition('closed => open', animate(200))
    ]),
    trigger('dropdown', [
      state('open', style({ height: '*'})),
      state('closed', style({ height: '0px', overflow: 'hidden'})),
      transition('open => closed', animate('200ms ease-in-out')),
      transition('closed => open', animate('200ms ease-in-out'))
    ]),
    trigger('search', [
      state('closed', style({width: '0px', padding: '0px'})),
      state('open', style({width: '300px'})),
      transition('open => closed', animate(200)),
      transition('closed => open', animate(200))
    ])
  ]
})
export class HeaderComponent implements OnInit, AfterViewInit {

    @ViewChild('searchInput')
    searchInput!: any;

    cards: any;

    open = 'closed';

    dropdown = 'closed';

    search = 'closed';

    searchString = '';

    lang = 'closed';

    section = '';

    allNews = false;

    langColor = '';

    flags = [{'flag': 'nepal', 'lang': 'НЕПАЛСКИ'},
             {'flag': 'germany', 'lang': 'НЕМАЧКИ'},
             {'flag': 'usa', 'lang': 'АМЕРИЧКИ'},
             {'flag': 'china', 'lang': 'КИНЕСКИ'},
             {'flag': 'croatia', 'lang': 'ХРВАТСКИ'},
             {'flag': 'spain', 'lang': 'ШПАНСКИ'},
             {'flag': 'italy', 'lang': 'ИТАЛИЈАНСКИ'}
    ];

    flag = {'flag': 'serbia', 'lang': 'СРПСКИ'};

    cyrilicState = 'ЋИРИЛИЧНО СТАЊЕ СТВАРИ';

    cyrilicString = '';

    cyrilicInd = 0;

    constructor(private newsRepo: NewsRepositoryService,
                private dialog: MatDialog,
                private router: Router,
                private textSvc: TextService,
                private itemsSvc: ItemsService,
                private httpSvc: HttpService) {
      this.showText();
    }

    ngOnInit(): void {
    }

    ngAfterViewInit(): void {
        this.textSvc.textNews = this.searchInput;
    }

    clickOutside(outside: boolean) {
      outside ? this.search = 'open' : this.search = 'closed';
      this.cards = [];
      this.searchInput.nativeElement.value = '';
    }

    clickOutsideMenu(event: boolean) {
      event ? this.open = 'open' : this.open = 'closed';
    }

    openCloseSearch() {
      this.search = this.search === 'closed' ? 'open' : 'closed';
      this.cards = [];
    }
  
    searchNews(search: string) {
      this.textSvc.setText(search);
      of(this.searchInput.nativeElement.value).pipe(
           distinctUntilChanged(), 
           delay(1000),
           filter((str: any) => str.length >= 3))
      .subscribe((search) => {
           this.httpSvc.search(search).subscribe((cards: any) => {
                this.cards = cards;
           });
      });
    }

    getNews(newsId: string) {
      this.router.navigate(['news/' + newsId]);
    }

    chooseSection(s: string) {
      this.section = this.section === s ? '' : s;
      this.newsRepo.section = this.section;
      this.newsRepo.currentNews = null;
      this.itemsSvc.categorySubject.next(this.section);
      if (this.section === '') {
          this.httpSvc.getSection('');
          this.router.navigate(['/']);
          this.newsRepository.section = '';
      } else {
          this.router.navigate(['section/' + this.section]);
      }
      this.openCloseMenu();
      this.openClosedCategory();
    }

    getAllNews(section: string) { 
      this.allNews = !this.allNews;
      if (this.allNews && !this.router.url.includes('section')) {
        this.httpSvc.getAllNews().subscribe((result: any) => {
          this.newsRepo.mainCards = result;
          this.newsRepo.cardsExists.next(result);
          this.openCloseMenu();
          if (this.dropdown === 'open') {
              this.openClosedCategory();
          }
          this.router.navigate(['section/' + ALL_NEWS]);
          this.newsRepository.section = ALL_NEWS;
        });
      } else {
        this.httpSvc.getSection(section);
        this.openCloseMenu();
        if (this.dropdown === 'open') {
            this.openClosedCategory();
        }
        this.router.navigate(['/']);
        this.newsRepository.section = '';
      }
    }

    openCloseMenu() {
      this.open = this.open === 'closed' ? 'open' : 'closed';
    }

    openClosedCategory() {
      this.dropdown = this.dropdown === 'closed' ? 'open' : 'closed';
    }

    openClosedLang() {
      this.lang = this.lang === 'closed' ? 'open' : 'closed';
    }

    showText() {
      const interval = setInterval(() => {
        if (this.cyrilicInd === this.cyrilicState.length) {
            clearInterval(interval);
            setTimeout(() => { this.cyrilicInd = -1; this.showText() }, 3000);
        } else {
            this.cyrilicInd++;
        }
        if (this.cyrilicInd >= 0) {
            this.cyrilicString = this.cyrilicState.slice(0, this.cyrilicInd);
        }
      }, 200);
    }

    showDialog() {
      this.openClosedLang();
      if (this.mobileView) {
          this.openCloseMenu();
      }
      this.dialog.open(LanguagePopUpComponent, {
        width: '600px',
        height: '255px'
      });
    }

    get newsRepository(): NewsRepositoryService {
        return this.newsRepo;
    }

    get headerCards(): NewsCard[] {
        return this.newsRepo.headerCards ? this.newsRepo.headerCards : [];
    }

    get mobileView(): boolean {
        return window.innerWidth <= 900;
    }

    get allNewsVar(): string {
        return ALL_NEWS;
    }
}
