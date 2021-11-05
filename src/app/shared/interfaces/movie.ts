export interface Movie {
  id?: number;
  title: string;
  poster: string;
  genre: Array<string>;
  year: number;
  duration: number;
  imdbRating: number;
  actors: Array<number>;
  companies?: number;
}
