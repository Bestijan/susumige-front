import { Injectable } from '@angular/core';
import { NewsRepositoryService } from './news-repository.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { News } from '../models/News';
import { UserDTO } from '../models/UserDTO';
import { UpdateInfoService } from './update-info.service';
import { Observable } from 'rxjs';
import { LeftsideCardsService } from './leftside-cards.service';
import { SectionService } from './section.service';

// const BASE_URL = 'https://shushumigelaza-25931.nodechef.com/';
const BASE_URL = 'http://localhost:3000/';
@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private newsRepo: NewsRepositoryService,
              private http: HttpClient,
              private router: Router,
              private updateInfoSvc: UpdateInfoService,
              private leftsideCardsSvc: LeftsideCardsService,
              private sectionSvc: SectionService) { }

  getNews(newsId: string) {
    if (!this.newsRepo.currentNews || (this.newsRepo.currentNews && this.newsRepo.currentNews.newsId !== newsId)) {
        this.http.get(`${BASE_URL}news?newsId=` + newsId).subscribe(news => {
            this.newsRepo.currentNews = new News(news);
            this.newsRepo.updateViews(this.newsRepo.currentNews!);
            this.router.navigate(['/news', this.newsRepo.currentNews.newsId]);
            const title = document.getElementById('title');
            title!.innerHTML = this.newsRepo.currentNews!.title;
            this.updateInfoSvc.updateInfoService.next(null);
            this.newsRepo.currentNewsObserver.next(null);
        });
    }
  }

  getSection(section: string) {
    this.http.get(`${BASE_URL}section-news?section=${section === '' ? '' : section}`)
        .subscribe((result: any) => {
            const title = document.getElementById('title');
            title!.innerHTML = section === '' ? 'ШУШУМИГЕ' : section.toUpperCase();
            this.newsRepo.mainCards = result;
            this.newsRepo.cardsExists.next(result);
    });
  }

  getBundle() {
    this.sectionSvc.sectionLoading.next(true);
    this.http.get(`${BASE_URL}bundle-news`, { headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })}).subscribe((res: any) => {
        this.newsRepo.leftSideCards = res.leftNews;
        this.leftsideCardsSvc.leftSideCards.next(null);
        this.newsRepo.headerCards = res.header;
        this.newsRepo.mainCards = res.main;
        this.sectionSvc.sectionLoading.next(false);
        if (this.router.url === '') {
            this.newsRepo.cardsExists.next(res.main);
        }
    }); 
  }

  sendComment(comment: string, newsId: string): any {
    const userDTOJSON = {'comment': comment, 'commentNick': this.newsRepo.socialUser!.name, 
      'img': this.newsRepo.userImg, 'newsId': newsId};
    const userDTO = new UserDTO(userDTOJSON);
    return this.http.post(`${BASE_URL}comment`, userDTO);
  }

  setLike(): any {
    return this.http.put(`${BASE_URL}like`, 
      {'newsId': this.newsRepo.currentNews!.newsId, 'email': this.newsRepo.socialUser!.email}).subscribe((res: any) => {
        this.newsRepo.currentNews!.likesNum = res.numberOfLikes;
      });
  }

  search(search: string): any {
    return this.http.get(`${BASE_URL}search?search=` + search);
  }

  getAllNews(): Observable<any> {
    return this.http.get(`${BASE_URL}all-news`, { headers: new HttpHeaders({'Content-Type': 'application/json'})});
  }

  getMobileViewNews(): Observable<any> {
    return this.http.get(`${BASE_URL}mobile-view-news`, {headers: new HttpHeaders({'Content-Type': 'application/json'})});
  }

  getOlderNews(): any {
    return this.http.get(`${BASE_URL}older-news?date=${this.newsRepo.dateLeftSidebar}`, { headers: new HttpHeaders({'Content-Type': 'application/json'})});
  }

  getNewerNews(): any {
    return this.http.get(`${BASE_URL}newer-news?date=${this.newsRepo.dateLeftSidebar}`, { headers: new HttpHeaders({'Content-Type': 'application/json'})});
  }

  getSectionNews(section: string): any {
    return this.http.get(`${BASE_URL}section-news?section=` + section)
                    .subscribe((result: any) => {
                                this.newsRepo.mainCards = result;
                                this.newsRepo.cardsExists.next(result);
    });
  }
}
