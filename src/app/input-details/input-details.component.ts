import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors, FormArray } from '@angular/forms';
import { CardDataService } from '../card-data.service';

@Component({
  selector: 'app-input-details',
  templateUrl: './input-details.component.html',
  styleUrls: ['./input-details.component.scss']
})
export class InputDetailsComponent {

  cardForm!: FormGroup;
  cardData: any = {};

  constructor(private fb: FormBuilder, private cardDataService: CardDataService) {
    this.cardForm = this.fb.group({
      cardholderName: ['', Validators.required],
      cardNumber: ['', [Validators.required, Validators.pattern(/^\d{16}$/), Validators.maxLength(16)]],
      expMonth: ['', [Validators.required, Validators.min(1), Validators.max(12)]],
      expYear: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(2)]],
      cvc: ['', [Validators.required, Validators.pattern(/^\d{3}$/)]]
    });
  }

  inputChange() {
    this.cardDataService.setCardData(this.cardData);
  }

  onSubmit() {
    if (this.cardForm.valid) {
      console.log('Form submitted with data:', this.cardForm.value);
      const cardData = this.cardForm.value;
      this.cardDataService.setCardData(cardData);
    } else {
      console.log('Form is invalid. Please check the fields.');
    }
  }



}
