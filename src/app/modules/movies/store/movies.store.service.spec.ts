import { TestBed } from '@angular/core/testing';

import { MoviesStoreService } from './movies.store.service';

describe('Movies.StoreService', () => {
  let service: MoviesStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MoviesStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
