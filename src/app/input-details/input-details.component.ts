import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-input-details',
  templateUrl: './input-details.component.html',
  styleUrls: ['./input-details.component.scss']
})
export class InputDetailsComponent {

  cardForm!: FormGroup;

  constructor(private fb: FormBuilder) {
    this.cardForm = this.fb.group({
      cardholderName: ['', Validators.required],
      cardNumber: ['', [Validators.required, Validators.pattern(/^\d{16}$/)]],
      expMonth: ['', [Validators.required, Validators.min(1), Validators.max(12)]],
      expYear: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(2)]],
      cvc: ['', [Validators.required, Validators.pattern(/^\d{3}$/)]]
    });
  }

  onSubmit() {
    if (this.cardForm.valid) {
      console.log('Form submitted with data:', this.cardForm.value);
    } else {
      console.log('Form is invalid. Please check the fields.');
    }
  }



}
