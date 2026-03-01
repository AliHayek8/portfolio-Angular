import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ContactService, ContactMessage, ContactResponse } from './contact';

describe('ContactService', () => {
  let service: ContactService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ContactService]
    });

    service = TestBed.inject(ContactService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should send a contact message via HTTP POST', () => {
    const mockMessage: ContactMessage = {
      name: 'John Doe',
      email: 'john@example.com',
      subject: 'Test Subject',
      message: 'Test message'
    };

    const mockResponse: ContactResponse = {
      success: true,
      message: 'Message sent successfully',
      data: mockMessage
    };

    service.sendMessage(mockMessage).subscribe((response) => {
      expect(response.success).toBe(true);
      expect(response.data).toEqual(mockMessage);
    });

    const req = httpMock.expectOne('/api/contact');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(mockMessage);
    req.flush(mockResponse);
  });

  it('should send message without optional subject', () => {
    const mockMessage: ContactMessage = {
      name: 'Jane Doe',
      email: 'jane@example.com',
      message: 'Message without subject'
    };

    const mockResponse: ContactResponse = {
      success: true,
      message: 'Message sent',
      data: mockMessage
    };

    service.sendMessage(mockMessage).subscribe((response) => {
      expect(response.success).toBe(true);
    });

    const req = httpMock.expectOne('/api/contact');
    expect(req.request.body.subject).toBeUndefined();
    req.flush(mockResponse);
  });
});
