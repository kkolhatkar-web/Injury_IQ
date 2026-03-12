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
    name: 'Rest + Mobility Protocol',
    duration: 12,
    targetArea: 'Full Body',
    injuryReduced: 'General Overuse',
    type: 'RED'
  },
  {
    id: 's2',
    name: 'Neuromuscular Training',
    duration: 7,
    targetArea: 'Lower Body',
    injuryReduced: 'ACL Strain',
    type: 'YELLOW'
  },
  {
    id: 's3',
    name: 'Performance Activation',
    duration: 10,
    targetArea: 'Core & Glutes',
    injuryReduced: 'Muscle Fatigue',
    type: 'GREEN'
  },
  {
    id: 's4',
    name: 'HSS RIIP REPS Protocol',
    duration: 7,
    targetArea: 'Lower Body',
    injuryReduced: 'ACL injury risk by 62%',
    type: 'YELLOW'
  }
];
