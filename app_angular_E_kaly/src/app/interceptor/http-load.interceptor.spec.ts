import { TestBed } from '@angular/core/testing';

import { HttpLoadInterceptor } from './http-load.interceptor';

describe('HttpLoadInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      HttpLoadInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: HttpLoadInterceptor = TestBed.inject(HttpLoadInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
