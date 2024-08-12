import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewsComponent } from './components/news/news.component';
import { MainComponent } from './components/main/main.component';
import { MainNewsComponent } from './components/main-news/main-news.component';

const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'news/:newsId', component: NewsComponent },
  { path: 'section/:section', component: MainComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
