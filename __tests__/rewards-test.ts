import { REWARDS_DATA, REWARDS_COLORS, calculatePoints, Reward } from '../utils/rewards';

describe('REWARDS_DATA', () => {
  it('contains 8 reward entries', () => {
    expect(REWARDS_DATA.length).toBe(8);
  });

  it('has unique IDs', () => {
    const ids = REWARDS_DATA.map((r) => r.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('has positive basePointValues', () => {
    REWARDS_DATA.forEach((r) => {
      expect(r.basePointValue).toBeGreaterThan(0);
    });
  });
});

describe('REWARDS_COLORS', () => {
  it('has one color per reward', () => {
    expect(REWARDS_COLORS.length).toBe(REWARDS_DATA.length);
  });
});

describe('calculatePoints', () => {
  const makeData = (): Reward[] => [
    { id: '1', name: 'A', basePointValue: 1000, displayedPointValue: 1000 },
    { id: '2', name: 'B', basePointValue: 160, displayedPointValue: 160 },
  ];

  it('defaults to factor 1 when input is empty', () => {
    const result = calculatePoints(makeData(), '');
    expect(result[0].displayedPointValue).toBe(1000);
    expect(result[1].displayedPointValue).toBe(160);
  });

  it('returns base values with factor of 1', () => {
    const result = calculatePoints(makeData(), '1');
    expect(result[0].displayedPointValue).toBe(1000);
    expect(result[1].displayedPointValue).toBe(160);
  });

  it('scales correctly for factor > 1', () => {
    const result = calculatePoints(makeData(), '5');
    expect(result[0].displayedPointValue).toBe(5000);
    expect(result[1].displayedPointValue).toBe(800);
  });

  it('scales correctly for factor < 1', () => {
    const result = calculatePoints(makeData(), '0.5');
    expect(result[0].displayedPointValue).toBe(500);
    expect(result[1].displayedPointValue).toBe(80);
  });

  it('rounds correctly', () => {
    const result = calculatePoints(makeData(), '1.5');
    expect(result[0].displayedPointValue).toBe(1500);
    expect(result[1].displayedPointValue).toBe(240);
  });

  it('handles non-numeric input by defaulting to 1', () => {
    const result = calculatePoints(makeData(), 'abc');
    expect(result[0].displayedPointValue).toBe(1000);
    expect(result[1].displayedPointValue).toBe(160);
  });

  it('handles zero input (defaults to factor 1 due to falsy check)', () => {
    const result = calculatePoints(makeData(), '0');
    expect(result[0].displayedPointValue).toBe(1000);
    expect(result[1].displayedPointValue).toBe(160);
  });

  it('handles negative input', () => {
    const result = calculatePoints(makeData(), '-1');
    expect(result[0].displayedPointValue).toBe(-1000);
    expect(result[1].displayedPointValue).toBe(-160);
  });

  it('handles decimal input', () => {
    const result = calculatePoints(makeData(), '2.5');
    expect(result[0].displayedPointValue).toBe(2500);
    expect(result[1].displayedPointValue).toBe(400);
  });

  it('preserves all entries in output', () => {
    const result = calculatePoints(makeData(), '3');
    expect(result.length).toBe(2);
  });

  it('preserves name and id fields', () => {
    const result = calculatePoints(makeData(), '2');
    expect(result[0].name).toBe('A');
    expect(result[0].id).toBe('1');
    expect(result[1].name).toBe('B');
    expect(result[1].id).toBe('2');
  });
});
