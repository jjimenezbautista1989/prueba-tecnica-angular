import { TestBed } from '@angular/core/testing';

import { MoviesService } from './movies.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';

describe('MoviesService', () => {
  let service: MoviesService;
  let httpTestingController: HttpTestingController;

  const mockMovies = [
    {
      id: 1,
      title: 'Dancing Lady',
      poster: 'http://dummyimage.com/400x600.png/cc0000/ffffff',
      genre: [
        'Comedy',
        'Romance'
      ],
      year: 2006,
      duration: 161,
      imdbRating: 8.27,
      actors: [
        4,
        5,
        6
      ],
      companies: 1
    }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MoviesService],
      imports: [HttpClientTestingModule]
    });
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(MoviesService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('get movie by id', () => {
    service.getMovieById('1')
      .subscribe(movie => {
        expect(movie[0].title).toEqual('Dancing Lady');
        expect(movie[0].poster).toEqual(
          'http://dummyimage.com/400x600.png/cc0000/ffffff'
        );
        expect(movie[0].genre).toEqual([
          'Comedy',
          'Romance'
        ]);
        expect(movie[0].year).toEqual(2006);
        expect(movie[0].duration).toEqual(161);
        expect(movie[0].imdbRating).toEqual(8.27);
        expect(movie[0].actors).toEqual([
          4,
          5,
          6
        ]);
        expect(movie[0].companies).toEqual(1);
      });

    const req = httpTestingController.expectOne(
      'http://localhost:3000/movies/1'
    );

    req.flush(mockMovies);
  });
});
