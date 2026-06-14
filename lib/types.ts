// ============================================
// CORE TYPES
// ============================================

export type MatchStatus = 'LIVE' | 'UPCOMING' | 'FINISHED';
export type Period = 'FULL' | 'FIRST_HALF' | 'SECOND_HALF';
export type FormResult = 'W' | 'D' | 'L';

export interface Team {
  id: string;
  name: string;
  shortName: string;
  logoUrl: string;
}

export interface Competition {
  id: string;
  slug: string;
  name: string;
  country: string;
  iconUrl: string;
  isFeatured: boolean;
}

export interface Match {
  id: string;
  competitionId: string;
  status: MatchStatus;
  homeTeam: Team;
  awayTeam: Team;
  homeScore: number | null;
  awayScore: number | null;
  minute?: number;
  kickoffTime: string;
  periodScores?: {
    firstHalf: { home: number; away: number } | null;
    secondHalf: { home: number; away: number } | null;
  };
}

// ============================================
// ANALYSIS DATA
// ============================================

export interface Insight {
  id: string;
  text: string;
  basis: string;
}

export interface PoissonPrediction {
  predictedScore: string; // e.g. "2-1"
  confidence: number; // 0-100
  methodNote: string;
}

export interface TeamForm {
  teamId: string;
  results: FormResult[]; // 5 derniers
}

export interface H2HRecord {
  teamAWins: number;
  draws: number;
  teamBWins: number;
}

export interface MatchAnalysis {
  matchId: string;
  insights: Insight[];
  prediction: PoissonPrediction;
  formHome: TeamForm;
  formAway: TeamForm;
  h2h: H2HRecord;
}

// ============================================
// MATCH STATS
// ============================================

export interface StatPair {
  label: string;
  home: number;
  away: number;
  unit?: '%';
}

export interface PlayerStat {
  id: string;
  name: string;
  teamId: string;
  avatarUrl: string;
  statLabel: string;
  statValue: string;
}

export interface MatchStats {
  matchId: string;
  period: Period;
  stats: StatPair[];
  cardsHome: number;
  cardsAway: number;
  playersToWatch: PlayerStat[];
}

// ============================================
// UI STATE
// ============================================

export type FilterTab = 'LIVE' | 'UPCOMING' | 'FINISHED';
