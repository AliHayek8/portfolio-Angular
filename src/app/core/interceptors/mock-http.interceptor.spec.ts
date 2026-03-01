import { TestBed } from '@angular/core/testing';
import { MockHttpInterceptor } from './mock-http.interceptor';
import { HttpClient, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';

describe('MockHttpInterceptor', () => {
  let interceptor: MockHttpInterceptor;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MockHttpInterceptor]
    });
    interceptor = TestBed.inject(MockHttpInterceptor);
  });

  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });

  it('should have intercept method', () => {
    expect(interceptor.intercept).toBeDefined();
  });

  it('should be an instance of MockHttpInterceptor', () => {
    expect(interceptor instanceof MockHttpInterceptor).toBe(true);
  });
});
