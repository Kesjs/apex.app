// Match types
export type MatchStatus = 'UPCOMING' | 'LIVE' | 'FINISHED';

export interface Team {
  id: string;
  name: string;
  code: string;
  logo: string;
}

export interface Score {
  home: number;
  away: number;
}

export interface Match {
  id: string;
  homeTeam: Team;
  awayTeam: Team;
  status: MatchStatus;
  score: Score;
  startTime: Date;
  competition: string;
  timeline: MatchEvent[];
}

export interface MatchEvent {
  minute: number;
  type: 'GOAL' | 'CARD' | 'SUBSTITUTION' | 'CHANCE';
  team: 'home' | 'away';
  player?: string;
  description: string;
}

// Analysis types
export interface Insight {
  title: string;
  description: string;
  calculation: string; // Base de calcul affichée en petit
  icon?: string;
}

export interface PoissonPrediction {
  homeGoals: number;
  awayGoals: number;
  confidence: number; // 0-100
  methodology: string;
}

export interface FormData {
  team: Team;
  last5: ('W' | 'D' | 'L')[];
}

export interface H2HData {
  homeWins: number;
  draws: number;
  awayWins: number;
}

export interface PreMatchAnalysis {
  insights: Insight[];
  poissonPrediction: PoissonPrediction;
  formData: [FormData, FormData]; // home, away
  h2h: H2HData;
}

// Match stats types
export interface TeamStats {
  team: Team;
  possession: number;
  shots: number;
  shotsOnTarget: number;
  corners: number;
  fouls: number;
  offsides: number;
  yellowCards: number;
  redCards: number;
}

export interface PlayerStat {
  id: string;
  name: string;
  team: Team;
  position: string;
  goals: number;
  assists: number;
  shotAccuracy?: number;
}

export interface MatchStats {
  matchId: string;
  homeTeamStats: TeamStats;
  awayTeamStats: TeamStats;
  playersToWatch: PlayerStat[];
  period: 'FULL' | 'FIRST_HALF' | 'SECOND_HALF';
}

// PromoCard types
export interface PromoCard {
  id: string;
  title: string;
  description: string;
  cta: string;
  link: string;
  utm: {
    source: string;
    medium: string;
    campaign: string;
  };
}
