import {describe, expect, test} from '@jest/globals';
import {EventParser} from './app'
import {Match} from './models'

describe('event parser', () => {
  const parser = new EventParser()
  const match: Match = {
    sport: "soccer",
    participant1: "Legia Warszawa",
    participant2: "Lech Poznań",
    score: '5:5',
  }
  test('validate sport when sport is correct', () => {
    expect(parser.validateSport(match)).toBe(true);
  });

  test("make event's name with dash", () => {
    expect(parser.makeEventName(match)).toBe("Legia Warszawa - Lech Poznań");
  });

  test("format score for soccer", () => {
    expect(parser.formatScore(match)).toBe("5:5");
  });

  test('validate sport when sport is incorrect', () => {
    match.sport = "hammer throw"
    expect(parser.validateSport(match)).toBe(false);
  });  

  test("make event's name with 'vs'", () => {
    match.sport = "tennis"
    expect(parser.makeEventName(match)).toBe("Legia Warszawa vs Lech Poznań");
  });  

  test("format score for basketball", () => {
    match.sport = "basketball"
    match.score = [
      ['1:2', '3:4'],
      ['5:6', '7:8']
    ]
    expect(parser.formatScore(match)).toBe("1:2,3:4,5:6,7:8");
  });

  test("format score for volleyball", () => {
    match.sport = "volleyball"
    match.score = "1:2,33:44,55:66,77:88"
    expect(parser.formatScore(match)).toBe("Main score: 1:2 (set1 33:44, set2 55:66, set3 77:88)");
  });
});