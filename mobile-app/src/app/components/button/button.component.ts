import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
  @Input() label: string;
  submitForm(): void {
    // Trigger form submission manually
    const form = document.forms[0]; // Assuming it's the first form on the page
    if (form) {
      form.submit();
    }
  }
}
