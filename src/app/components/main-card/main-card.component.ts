import { Component, Input } from '@angular/core';
import { NewsCard } from 'src/app/models/NewsCard';

@Component({
  selector: 'app-main-card',
  templateUrl: './main-card.component.html',
  styleUrls: ['./main-card.component.scss']
})
export class MainCardComponent {

  @Input()
  card!: NewsCard;
}
