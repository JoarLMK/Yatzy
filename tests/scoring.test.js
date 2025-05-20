import { yatzy, pair } from '../utils/scoring';

test('yatzy ger 50 poäng vid fem lika', () => {
  expect(yatzy([6,6,6,6,6])).toBe(50);
});

test('pair ger 8 poäng för två fyror', () => {
  expect(pair([4,4,1,2,3])).toBe(8);
});
