import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { NewsCard } from 'src/app/models/NewsCard';
import { NewsRepositoryService } from 'src/app/services/news-repository.service';
import { SectionService } from 'src/app/services/section.service';
import { ShowLeftSidebarService } from 'src/app/services/show-left-sidebar.service';
@Component({
  selector: 'app-main-news',
  templateUrl: './main-news.component.html',
  styleUrls: ['./main-news.component.scss'],
  animations: [
    trigger('toggle', [
        state('closed', style({ transform : 'translateX(-100%)', zIndex: '1', position: 'absolute', display: 'none' })),
        state('open', style({ transform: 'translateX(0%)', zIndex: '1', position: 'absolute' })),
        transition('closed => open', animate(200)),
        transition('open => closed', animate(200))
    ])
  ]
})
export class MainNewsComponent implements OnInit {

    open = 'closed';

    section = ''

    sectionArray = ['ПОЛИТИКА', 'ЖИВОТ', 'ХРОНИКА', 'СРБИЈА', 'СВЕТ'];

    constructor(private newsRepo: NewsRepositoryService,
                private showSidebar: ShowLeftSidebarService,
                private sectionSvc: SectionService,
                private router: Router) {
    }

    ngOnInit(): void {
        this.sectionSvc.section.subscribe(() => {
            this.section = '';
            this.newsRepo.section = '';
        });
    }

    openClose() {
        this.open === '' ? this.open = 'open' : this.open === 'open' ? this.open = 'closed' : this.open = 'open';
        this.showSidebar.showSidebar.next(this.open);
    }

    chooseSection(s: string) {
        if (s === this.newsRepo.section) { 
            this.router.navigate(['']);
            this.newsRepo.section = '';
        } else {
            this.router.navigate(['section/' + s]);
        }
        this.sectionSvc.sectionLoading.next(true);
    }

    get indexOfSection(): number {
        return this.sectionArray.indexOf(this.newsRepo.section);
    }

    get mainCards(): NewsCard[] {
        return this.newsRepo.mainCards;
    }

    get sectionLoading(): BehaviorSubject<boolean> {
        return this.sectionSvc.sectionLoading;
    }
}
