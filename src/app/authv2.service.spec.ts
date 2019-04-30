import { TestBed } from '@angular/core/testing';

import { Authv2Service } from './authv2.service';

describe('Authv2Service', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: Authv2Service = TestBed.get(Authv2Service);
    expect(service).toBeTruthy();
  });
});
