import { Component } from '@angular/core';
import { CardDataService } from './card-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'InteractiveCardDetailsForm';

  cardData: any = {}; 

  constructor(private cardDataService: CardDataService){
    this.cardDataService.cardDataEmitter.subscribe((data: any) => {
      this.cardData = data;
    });
  }
}
