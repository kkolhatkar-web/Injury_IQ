export type AthleteStatus = 'SAFE' | 'CAUTION' | 'OVERLOAD_RISK';
export type ConsentStatus = 'VERIFIED' | 'ACTION_REQUIRED';

export interface Athlete {
  id: string;
  name: string;
  position: string;
  age: number;
  status: AthleteStatus;
  consent: ConsentStatus;
  hrv: number;
  hrvTrend: number[];
  load: number;
  sleep: number;
  wellness: number;
  teamSync: {
    school: 'synced' | 'pending' | 'none';
    club: 'synced' | 'pending' | 'none';
  };
}

export interface Prescription {
  id: string;
  athleteId: string;
  riskLevel: 'LOW' | 'MODERATE' | 'HIGH';
  injuryType: string;
  action: string;
  bodyPart: string;
}

export interface RecoverySession {
  id: string;
  name: string;
  duration: number;
  targetArea: string;
  injuryReduced: string;
  type: 'RED' | 'YELLOW' | 'GREEN';
}
