import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FooterComponent } from './components/footer/footer.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { HeaderCardComponent } from './components/header-card/header-card.component';
import { SideCardComponent } from './components/side-card/side-card.component';
import { MainCardComponent } from './components/main-card/main-card.component';
import { MainNewsComponent } from './components/main-news/main-news.component';
import { NewsComponent } from './components/news/news.component';
import { SafePipe } from './pipes/safe-pipe';
import { MainComponent } from './components/main/main.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { MaterialModule } from './modules/material/material.module';
import { LanguagePopUpComponent } from './components/language-pop-up/language-pop-up.component';
import { LeftSidebarComponent } from './components/left-sidebar/left-sidebar.component';
import { ClickOutsideDirective } from './directives/click-outside.directive';
import { CommentsComponent } from './components/comments/comments.component';
import { SocialLoginModule, SocialAuthServiceConfig } from '@abacritt/angularx-social-login';
import { GoogleLoginProvider } from '@abacritt/angularx-social-login';
import { CLIENT_ID } from './constants/client-id';
import { GoogleSignInComponent } from './components/google-sign-in/google-sign-in.component';
import { GoogleSigninButtonModule } from '@abacritt/angularx-social-login';
import { CyrilicLetterDirective } from './directives/cyrilic-letter.directive';
import { CarouselLoadingComponent } from "./components/carousel-loading/carousel-loading.component";
import { SideCardLoadingComponent } from './components/side-card-loading/side-card-loading.component';
import { MainLoadingComponent } from './components/main-loading/main-loading.component';
import { NewsLoadingComponent } from './components/news-loading/news-loading.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HeaderCardComponent,
    SideCardComponent,
    MainCardComponent,
    MainNewsComponent,
    NewsComponent,
    SafePipe,
    MainComponent,
    CarouselComponent,
    LanguagePopUpComponent,
    LeftSidebarComponent,
    ClickOutsideDirective,
    CyrilicLetterDirective,
    CommentsComponent,
    GoogleSignInComponent,
    CarouselLoadingComponent,
    SideCardLoadingComponent,
    MainLoadingComponent,
    NewsLoadingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
    NgbModule,
    GoogleSigninButtonModule,
    SocialLoginModule
  ],
  providers: [    {
    provide: 'SocialAuthServiceConfig',
    useValue: {
      autoLogin: false,
      use_fedcm_for_prompt: true,
      providers: [
        {
          id: GoogleLoginProvider.PROVIDER_ID,
          provider: new GoogleLoginProvider(
            CLIENT_ID
          )
        }
      ]
    } as SocialAuthServiceConfig
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
