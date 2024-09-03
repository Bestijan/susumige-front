import { GoogleLoginProvider, SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { Component } from '@angular/core';
import { NewsRepositoryService } from 'src/app/services/news-repository.service';
import { User } from 'src/app/models/User';
import { HttpClient } from '@angular/common/http';
import { News } from 'src/app/models/News';
import { HttpService } from 'src/app/services/http-service.service';

@Component({
  selector: 'app-google-sign-in',
  templateUrl: './google-sign-in.component.html',
  styleUrl: './google-sign-in.component.scss'
})
export class GoogleSignInComponent {
  user!: SocialUser;
  loggedIn!: boolean;

  comment!: string;

  like = false;
  
  constructor(private authService: SocialAuthService,
              private newsRepoSvc: NewsRepositoryService,
              private http: HttpClient,
              private httpSvc: HttpService
  ) { }

  ngOnInit() {
    this.authService.authState.subscribe((user) => {
      this.user = user;
      if (this.user) {
        this.newsRepoSvc.socialUser = new User(user);
        // this.like = this.newsRepoSvc.currentNews!.likes.findIndex(l => l.email === user.email && l.liked) >= 0;
        // this.newsRepoSvc.updateLikesNum(this.newsRepoSvc.currentNews!.newsId, this.like);
        this.http.get(this.user.photoUrl, { responseType: 'blob' }).subscribe(result => {
            const reader = new FileReader();
            reader.readAsDataURL(result);
            reader.onloadend = (img) => {
              this.newsRepoSvc.userImg = (<FileReader>img.currentTarget).result;
            };
        });
      }
      this.loggedIn = (user !== null);
    });
  }

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  signOut() {
    this.authService.signOut().then(() => { this.newsRepoSvc.socialUser = null });
  }

  setLike() { 
    this.httpSvc.setLike().subscribe((like: boolean) => {
        this.like = like;
    })
  }

  get news(): News | null {
    return this.newsRepoSvc.currentNews;
  }
}
