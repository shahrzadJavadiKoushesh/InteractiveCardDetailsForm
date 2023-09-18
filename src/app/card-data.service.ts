import { Injectable } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CardDataService {

  cardDataEmitter = new EventEmitter<any>();
  complete: boolean = false;

  constructor() { }

  setCardData(cardData: any) {
    this.cardDataEmitter.emit(cardData);
  }
}
