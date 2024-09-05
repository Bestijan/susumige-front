import { Component, Input } from '@angular/core';
import { NewsCard } from 'src/app/models/NewsCard';

@Component({
  selector: 'app-side-card',
  templateUrl: './side-card.component.html',
  styleUrls: ['./side-card.component.scss']
})
export class SideCardComponent {

  @Input()
  card!: NewsCard;
}
