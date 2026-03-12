import { Athlete, RecoverySession } from './types';

export const MOCK_ATHLETES: Athlete[] = [
  {
    id: '1',
    name: 'Marcus Thompson',
    position: 'Midfielder',
    age: 14,
    status: 'CAUTION',
    consent: 'VERIFIED',
    hrv: 68,
    hrvTrend: [62, 65, 64, 67, 70, 68, 68],
    load: 75,
    sleep: 7.5,
    wellness: 4,
    teamSync: { school: 'synced', club: 'synced' }
  },
  {
    id: '2',
    name: 'Emma Rodriguez',
    position: 'Forward',
    age: 15,
    status: 'OVERLOAD_RISK',
    consent: 'VERIFIED',
    hrv: 42,
    hrvTrend: [55, 52, 50, 48, 45, 43, 42],
    load: 92,
    sleep: 6.2,
    wellness: 2,
    teamSync: { school: 'pending', club: 'synced' }
  },
  {
    id: '3',
    name: 'Leo Chen',
    position: 'Defender',
    age: 13,
    status: 'SAFE',
    consent: 'ACTION_REQUIRED',
    hrv: 75,
    hrvTrend: [70, 72, 74, 73, 75, 76, 75],
    load: 45,
    sleep: 8.5,
    wellness: 5,
    teamSync: { school: 'none', club: 'synced' }
  }
];

export const RECOVERY_SESSIONS: RecoverySession[] = [
  {
    id: 's1',
    name: 'Yoga and Mobility Stretching',
    duration: 12,
    targetArea: 'Full Body',
    injuryReduced: 'General Overuse',
    type: 'RED',
    imageUrl: 'https://images.unsplash.com/photo-1552196563-55cd4e45efb3?auto=format&fit=crop&q=80&w=800&h=600'
  },
  {
    id: 's2',
    name: 'Athletic Balance Training',
    duration: 7,
    targetArea: 'Lower Body',
    injuryReduced: 'ACL Strain',
    type: 'YELLOW',
    imageUrl: 'https://images.unsplash.com/photo-1594381898411-846e7d193883?auto=format&fit=crop&q=80&w=800&h=600'
  },
  {
    id: 's3',
    name: 'Core Stability Exercise',
    duration: 10,
    targetArea: 'Core & Glutes',
    injuryReduced: 'Muscle Fatigue',
    type: 'GREEN',
    imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&q=80&w=800&h=600'
  },
  {
    id: 's4',
    name: 'ACL Prevention Drill',
    duration: 7,
    targetArea: 'Lower Body',
    injuryReduced: 'ACL injury risk by 62%',
    type: 'YELLOW',
    imageUrl: 'https://images.unsplash.com/photo-1434682881908-b43d0467b798?auto=format&fit=crop&q=80&w=800&h=600'
  }
];
