import { TestBed, async, inject } from '@angular/core/testing';

import { TpoGuard } from './tpo.guard';

describe('TpoGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TpoGuard]
    });
  });

  it('should ...', inject([TpoGuard], (guard: TpoGuard) => {
    expect(guard).toBeTruthy();
  }));
});
