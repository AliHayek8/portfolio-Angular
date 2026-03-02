import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { CommonModule } from '@angular/common';
import { ContactService, ContactMessage } from '../../core/services/contact';

@Component({
  standalone: true,
  selector: 'app-contact',
  imports: [ReactiveFormsModule, ButtonsModule, CommonModule],
  templateUrl: './contact.html'
  ,
  styleUrls: ['./contact.scss']
})
export class ContactComponent {

  form!: FormGroup;
  submitted = false;
  isLoading = false;
  successMessage = 'Your message has been sent successfully! I\'ll get back to you soon.';
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private contactService: ContactService
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      subject: [''],
      message: ['', Validators.required]
    });
  }

  submit() {
    if (this.form.valid) {
      this.isLoading = true;
      this.errorMessage = '';

      const contactMessage: ContactMessage = {
        name: this.form.value.name,
        email: this.form.value.email,
        subject: this.form.value.subject,
        message: this.form.value.message
      };

      this.contactService.sendMessage(contactMessage).subscribe({
        next: (response) => {
          console.log('Message sent successfully:', response);
          this.submitted = true;
          this.isLoading = false;

          // Reset form after 3 seconds
          setTimeout(() => {
            this.form.reset();
            this.submitted = false;
          }, 3000);
        },
        error: (error) => {
          console.error('Error sending message:', error);
          this.errorMessage = 'Failed to send message. Please try again later.';
          this.isLoading = false;
        }
      });
    }
  }
}
