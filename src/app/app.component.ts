import { Component, OnInit } from '@angular/core';
import { NewsRepositoryService } from './services/news-repository.service';
import { NavigationEnd, Router } from '@angular/router';
import { HttpService } from './services/http-service.service';
import { ALL_NEWS } from './constants/all-news';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

    constructor(private newsRepo: NewsRepositoryService,
                private httpSvc: HttpService,
                private router: Router) {
    }  

    ngOnInit(): void {
      this.httpSvc.getBundle();
      this.router.events.subscribe((e) => {
        if (e instanceof NavigationEnd) {
            const urlSplitted = e.url.split('/');
            if (e.url === '/' || e.url.includes('/section/')) { 
                const section = decodeURIComponent(urlSplitted[urlSplitted.length - 1]);
                if (section !== ALL_NEWS) {
                    this.httpSvc.getSection(e.url.includes('/section/') ? section : '');
                    this.newsRepo.section = e.url.includes('/section/') ? section : '';
                } else {
                    this.httpSvc.getAllNews().subscribe((result: any) => {
                        this.newsRepo.mainCards = result;
                        this.newsRepo.cardsExists.next(result);
                        const title = document.getElementById('title');
                        title!.innerHTML = section.toUpperCase();
                        this.newsRepo.section = ALL_NEWS;
                    });
                }
            } else { 
              this.httpSvc.getNews(urlSplitted[urlSplitted.length - 1]);
            }
        }
      });
    }

}
