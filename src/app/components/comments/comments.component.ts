import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { User } from 'src/app/models/User';
import { HttpService } from 'src/app/services/http-service.service';
import { NewsRepositoryService } from 'src/app/services/news-repository.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent {

  @ViewChild('commentText')
  commentText!: ElementRef;

  @Input()
  newsId!: string;

  constructor(private newsRepo: NewsRepositoryService,
              private httpSvc: HttpService
  ) {
    this.newsRepo.comment = '';
  }

  setComment(event: KeyboardEvent) {
    this.newsRepo.comment += event.key;
  }

  sendComment() {
    this.httpSvc.sendComment(this.commentText, this.newsId);
  }

  get user(): User | null {
      return this.newsRepo.socialUser;
  }
  
  get imgUrl(): string | ArrayBuffer | null {
      return this.newsRepo.userImg;
  }
}
