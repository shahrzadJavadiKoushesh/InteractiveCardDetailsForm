import { Component, ViewChild, ElementRef, AfterViewInit, ViewChildren, QueryList, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors, FormArray } from '@angular/forms';
import { CardDataService } from '../card-data.service';

@Component({
  selector: 'app-input-details',
  templateUrl: './input-details.component.html',
  styleUrls: ['./input-details.component.scss']
})
export class InputDetailsComponent implements AfterViewInit {

  cardForm!: FormGroup;
  cardData: any = {};

  @ViewChildren('inputElement') inputElements!: QueryList<ElementRef<HTMLInputElement>>;

  charLimits = [8, 19, 2, 2, 3];


  constructor(private fb: FormBuilder, private cardDataService: CardDataService, private renderer: Renderer2) {
    this.cardForm = this.fb.group({
      cardholderName: ['', Validators.required],
      cardNumber: ['', [Validators.required, Validators.pattern(/\d{4} \d{4} \d{4} \d{4}/gm),]],
      expMonth: ['', [Validators.required, Validators.min(1), Validators.max(12), this.validateMonthRange.bind(this)]],
      expYear: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(2)]],
      cvc: ['', [Validators.required, Validators.pattern(/^\d{3}$/)]]
    });
  }

  ngAfterViewInit() {
    this.inputElements.first.nativeElement.focus();
  }

  handleInputFocus(currentIndex: number) {
    const nextIndex = currentIndex + 1;

    const currentInput = this.inputElements.toArray()[currentIndex].nativeElement;
    const charLimit = this.charLimits[currentIndex];

    if (currentInput.value.length >= charLimit) {
      if (nextIndex < this.inputElements.length) {
        this.renderer.selectRootElement(this.inputElements.toArray()[nextIndex].nativeElement).focus();
      }
    }
  }

  inputChange() {
    this.cardDataService.setCardData(this.cardData);
  }

  validateMonthRange(control: AbstractControl): ValidationErrors | null {
    const expMonth = +control.value;
    if (expMonth < 1 || expMonth > 12) {
      return { monthRange: true };
    }
    return null;
  }

  onSubmit() {
    if (this.cardForm.valid) {
      console.log('Form submitted with data:', this.cardForm.value);
      const cardData = this.cardForm.value;
      this.cardDataService.setCardData(cardData);
      this.cardDataService.complete = true;
    } else {
      console.log('Form is invalid. Please check the fields.');
    }
  }
}
