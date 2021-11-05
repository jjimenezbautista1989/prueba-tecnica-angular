import { DurationPipe } from './duration.pipe';

describe('DurationPipe', () => {
  const pipe = new DurationPipe();

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  //Transform minutes to hours and minutes
  it('transforms "" to "-h --min."', () => {
    expect(pipe.transform(undefined)).toBe('-h --min.');
  });

  it('transforms "62" to "1h 2min."', () => {
    expect(pipe.transform(62)).toBe('1h 2min.');
  });
});
