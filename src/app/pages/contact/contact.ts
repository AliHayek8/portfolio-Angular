import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { CommonModule } from '@angular/common';
import { ContactService, ContactMessage } from '../../core/services/contact';

@Component({
  standalone: true,
  selector: 'app-contact',
  imports: [ReactiveFormsModule, ButtonsModule, CommonModule],
  template: `
    <div class="contact-container">
      <div class="contact-header">
        <h1>Get In Touch</h1>
        <p class="subtitle">I'm here to answer your questions</p>
      </div>

      <div class="contact-content">
        <div class="contact-info">
          <h2>Contact Information</h2>

          <div class="info-item">
            <span class="icon">📧</span>
            <div>
              <h3>Email</h3>
              <p>ahayek50@gmail.com</p>
            </div>
          </div>

          <div class="info-item">
            <span class="icon">📱</span>
            <div>
              <h3>Phone</h3>
              <p>+970 569841288</p>
            </div>
          </div>

          <div class="info-item">
            <span class="icon">📍</span>
            <div>
              <h3>Location</h3>
              <p>Nablus, Palestine</p>
            </div>
          </div>

          <div class="social-links">
            <h3>Follow Me</h3>
            <div class="social-icons">
              <a href="#" class="social-icon">LinkedIn  </a>
              <a href="https://github.com/AliHayek8" class="social-icon">GitHub  </a>
              <a href="#" class="social-icon">Twitter  </a>
            </div>
          </div>
        </div>

        <div class="contact-form-wrapper">
          <h2>Send Me a Message</h2>
          <form [formGroup]="form" (ngSubmit)="submit()" class="contact-form">
            <div class="form-group">
              <label for="name">Full Name</label>
              <input
                id="name"
                type="text"
                formControlName="name"
                placeholder="Enter your full name"
                class="form-input"
              />
              <span class="error" *ngIf="form.get('name')?.invalid && form.get('name')?.touched">
                Name is required
              </span>
            </div>

            <div class="form-group">
              <label for="email">Email Address</label>
              <input
                id="email"
                type="email"
                formControlName="email"
                placeholder="Enter your email address"
                class="form-input"
              />
              <span class="error" *ngIf="form.get('email')?.invalid && form.get('email')?.touched">
                <span *ngIf="form.get('email')?.errors?.['required']">Email is required</span>
                <span *ngIf="form.get('email')?.errors?.['email']">Invalid email address</span>
              </span>
            </div>

            <div class="form-group">
              <label for="subject">Subject</label>
              <input
                id="subject"
                type="text"
                formControlName="subject"
                placeholder="Message subject"
                class="form-input"
              />
            </div>

            <div class="form-group">
              <label for="message">Message</label>
              <textarea
                id="message"
                formControlName="message"
                placeholder="Write your message here..."
                class="form-textarea"
                rows="6"
              ></textarea>
              <span class="error" *ngIf="form.get('message')?.invalid && form.get('message')?.touched">
                Message is required
              </span>
            </div>

            <div class="form-actions">
              <button
                kendoButton
                type="submit"
                [disabled]="form.invalid || isLoading"
                class="btn-submit"
              >
                {{ isLoading ? 'Sending...' : 'Send Message' }}
              </button>
              <button
                kendoButton
                type="reset"
                [disabled]="isLoading"
                class="btn-reset"
              >
                Clear Form
              </button>
            </div>

            <div class="success-message" *ngIf="submitted">
              ✓ {{ successMessage }}
            </div>

            <div class="error-message" *ngIf="errorMessage">
              ✗ {{ errorMessage }}
            </div>
          </form>
        </div>
      </div>
    </div>
  `,
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
