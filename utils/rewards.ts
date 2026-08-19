export interface Reward {
  id: string;
  name: string;
  basePointValue: number;
  displayedPointValue: number;
}

export const REWARDS_DATA: Reward[] = [
  { id: '1', name: 'Coin Out', basePointValue: 1000, displayedPointValue: 1000 },
  { id: '2', name: 'Fetch', basePointValue: 1000, displayedPointValue: 1000 },
  { id: '3', name: 'Microsoft Rewards', basePointValue: 1000, displayedPointValue: 1000 },
  { id: '4', name: 'Mistplay', basePointValue: 3000, displayedPointValue: 3000 },
  { id: '5', name: 'MyPoints', basePointValue: 160, displayedPointValue: 160 },
  { id: '6', name: 'Pogo', basePointValue: 1000, displayedPointValue: 1000 },
  { id: '9', name: 'Shopkick', basePointValue: 250, displayedPointValue: 250 },
  { id: '10', name: 'Swagbucks', basePointValue: 100, displayedPointValue: 100 },
];

export const REWARDS_COLORS = ['#20A6F5', '#FCAD27', '#1EC5F4', '#34F3D5', '#EE794F', '#A484E1', '#199BD8', '#6DB9D6'];

export function calculatePoints(data: Reward[], value: string): Reward[] {
  const factor = parseFloat(value) || 1;
  return data.map((row) => ({
    ...row,
    displayedPointValue: Math.round(row.basePointValue * factor),
  }));
}
