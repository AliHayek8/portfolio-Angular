import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ContactMessage {
  name: string;
  email: string;
  subject?: string;
  message: string;
}

export interface ContactResponse {
  success: boolean;
  message: string;
  data?: ContactMessage;
}

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  private apiUrl = '/api/contact';

  constructor(private http: HttpClient) { }

  /**
   * Send a contact message
   * @param message - Contact message data
   * @returns Observable<ContactResponse>
   */
  sendMessage(message: ContactMessage): Observable<ContactResponse> {
    return this.http.post<ContactResponse>(this.apiUrl, message);
  }
}
