import {
  Team,
  Competition,
  Match,
  MatchAnalysis,
  MatchStats,
} from './types';

// ============================================
// COMPETITIONS
// ============================================

export const mockCompetitions: Competition[] = [
  {
    id: 'ucl',
    slug: 'champions-league',
    name: 'Champions League',
    country: 'EU',
    iconUrl: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"%3E%3Ccircle cx="50" cy="50" r="48" fill="%23001f3f" stroke="%23FFD700" stroke-width="2"/%3E%3Ctext x="50" y="60" font-size="24" fill="%23FFD700" text-anchor="middle" font-weight="bold"%3ECL%3C/text%3E%3C/svg%3E',
    isFeatured: true,
  },
  {
    id: 'pl',
    slug: 'premier-league',
    name: 'Premier League',
    country: 'England',
    iconUrl: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"%3E%3Crect x="10" y="10" width="80" height="80" fill="%23003366" stroke="%23FFFFFF" stroke-width="2"/%3E%3Ctext x="50" y="60" font-size="20" fill="%23FFFFFF" text-anchor="middle" font-weight="bold"%3EPL%3C/text%3E%3C/svg%3E',
    isFeatured: true,
  },
  {
    id: 'll',
    slug: 'la-liga',
    name: 'La Liga',
    country: 'Spain',
    iconUrl: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"%3E%3Crect x="10" y="10" width="80" height="80" fill="%23DC143C" stroke="%23FFD700" stroke-width="2"/%3E%3Ctext x="50" y="60" font-size="20" fill="%23FFD700" text-anchor="middle" font-weight="bold"%3ELL%3C/text%3E%3C/svg%3E',
    isFeatured: true,
  },
  {
    id: 'l1',
    slug: 'ligue-1',
    name: 'Ligue 1',
    country: 'France',
    iconUrl: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"%3E%3Ccircle cx="50" cy="50" r="48" fill="%230066CC" stroke="%23FFFFFF" stroke-width="2"/%3E%3Ctext x="50" y="60" font-size="20" fill="%23FFFFFF" text-anchor="middle" font-weight="bold"%3EL1%3C/text%3E%3C/svg%3E',
    isFeatured: true,
  },
  {
    id: 'sa',
    slug: 'serie-a',
    name: 'Serie A',
    country: 'Italy',
    iconUrl: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"%3E%3Crect x="10" y="10" width="80" height="80" fill="%23003d7a" stroke="%23ffffff" stroke-width="2"/%3E%3Ctext x="50" y="60" font-size="20" fill="%23ffffff" text-anchor="middle" font-weight="bold"%3ESA%3C/text%3E%3C/svg%3E',
    isFeatured: true,
  },
  {
    id: 'bl',
    slug: 'bundesliga',
    name: 'Bundesliga',
    country: 'Germany',
    iconUrl: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"%3E%3Ccircle cx="50" cy="50" r="48" fill="%23000000" stroke="%23D00000" stroke-width="2"/%3E%3Ctext x="50" y="60" font-size="20" fill="%23D00000" text-anchor="middle" font-weight="bold"%3EBL%3C/text%3E%3C/svg%3E',
    isFeatured: false,
  },
  {
    id: 'can',
    slug: 'can',
    name: 'Africa Cup of Nations',
    country: 'Africa',
    iconUrl: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"%3E%3Crect x="10" y="10" width="80" height="80" fill="%23FCD116" stroke="%23000000" stroke-width="2"/%3E%3Ctext x="50" y="60" font-size="16" fill="%23000000" text-anchor="middle" font-weight="bold"%3ECAN%3C/text%3E%3C/svg%3E',
    isFeatured: false,
  },
  {
    id: 'wc26',
    slug: 'world-cup-2026',
    name: 'World Cup 2026',
    country: 'Intl',
    iconUrl: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"%3E%3Ccircle cx="50" cy="50" r="48" fill="%23FFD700" stroke="%23000000" stroke-width="2"/%3E%3Ctext x="50" y="60" font-size="16" fill="%23000000" text-anchor="middle" font-weight="bold"%3EWC%3C/text%3E%3C/svg%3E',
    isFeatured: false,
  },
];

// ============================================
// TEAMS
// ============================================

const teamLogoSvg = (initials: string, color: string) =>
  `data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"%3E%3Ccircle cx="50" cy="50" r="48" fill="${encodeURIComponent(color)}" stroke="%23ffffff" stroke-width="2"/%3E%3Ctext x="50" y="60" font-size="36" fill="%23ffffff" text-anchor="middle" font-weight="bold"%3E${initials}%3C/text%3E%3C/svg%3E`;

const teams: Record<string, Team> = {
  PSG: {
    id: 'psg',
    name: 'Paris Saint-Germain',
    shortName: 'PSG',
    logoUrl: teamLogoSvg('PSG', '%234C7FD9'),
  },
  OM: {
    id: 'om',
    name: 'Olympique Marseille',
    shortName: 'OM',
    logoUrl: teamLogoSvg('OM', '%23FFFFFF'),
  },
  MCI: {
    id: 'mci',
    name: 'Manchester City',
    shortName: 'MCI',
    logoUrl: teamLogoSvg('MCI', '%23649FD9'),
  },
  LIV: {
    id: 'liv',
    name: 'Liverpool',
    shortName: 'LIV',
    logoUrl: teamLogoSvg('LIV', '%23C8102E'),
  },
  RMA: {
    id: 'rma',
    name: 'Real Madrid',
    shortName: 'RMA',
    logoUrl: teamLogoSvg('RMA', '%23FFFFFF'),
  },
  FCB: {
    id: 'fcb',
    name: 'FC Barcelona',
    shortName: 'FCB',
    logoUrl: teamLogoSvg('FCB', '%23004B9D'),
  },
  JUV: {
    id: 'juv',
    name: 'Juventus',
    shortName: 'JUV',
    logoUrl: teamLogoSvg('JUV', '%23000000'),
  },
  ITA: {
    id: 'ita',
    name: 'Inter Milan',
    shortName: 'ITA',
    logoUrl: teamLogoSvg('ITA', '%23000000'),
  },
  BVB: {
    id: 'bvb',
    name: 'Borussia Dortmund',
    shortName: 'BVB',
    logoUrl: teamLogoSvg('BVB', '%23FFD700'),
  },
  BAY: {
    id: 'bay',
    name: 'Bayern Munich',
    shortName: 'BAY',
    logoUrl: teamLogoSvg('BAY', '%23DC0A17'),
  },
  EGY: {
    id: 'egy',
    name: 'Egypt',
    shortName: 'EGY',
    logoUrl: teamLogoSvg('EGY', '%23CE1126'),
  },
  SEN: {
    id: 'sen',
    name: 'Senegal',
    shortName: 'SEN',
    logoUrl: teamLogoSvg('SEN', '%23007A5E'),
  },
};

// ============================================
// MATCHES
// ============================================

const now = new Date();

export const mockMatches: Match[] = [
  // LIVE
  {
    id: 'match-1',
    competitionId: 'l1',
    status: 'LIVE',
    homeTeam: teams.PSG,
    awayTeam: teams.OM,
    homeScore: 2,
    awayScore: 1,
    minute: 67,
    kickoffTime: new Date(now.getTime() - 67 * 60000).toISOString(),
    periodScores: {
      firstHalf: { home: 1, away: 0 },
      secondHalf: { home: 1, away: 1 },
    },
  },
  {
    id: 'match-2',
    competitionId: 'pl',
    status: 'LIVE',
    homeTeam: teams.MCI,
    awayTeam: teams.LIV,
    homeScore: 1,
    awayScore: 1,
    minute: 45,
    kickoffTime: new Date(now.getTime() - 45 * 60000).toISOString(),
    periodScores: {
      firstHalf: { home: 1, away: 1 },
      secondHalf: null,
    },
  },
  {
    id: 'match-3',
    competitionId: 'ucl',
    status: 'LIVE',
    homeTeam: teams.RMA,
    awayTeam: teams.FCB,
    homeScore: 0,
    awayScore: 0,
    minute: 23,
    kickoffTime: new Date(now.getTime() - 23 * 60000).toISOString(),
    periodScores: {
      firstHalf: null,
      secondHalf: null,
    },
  },
  // UPCOMING
  {
    id: 'match-4',
    competitionId: 'sa',
    status: 'UPCOMING',
    homeTeam: teams.JUV,
    awayTeam: teams.ITA,
    homeScore: null,
    awayScore: null,
    kickoffTime: new Date(now.getTime() + 2 * 3600000).toISOString(),
  },
  {
    id: 'match-5',
    competitionId: 'bl',
    status: 'UPCOMING',
    homeTeam: teams.BVB,
    awayTeam: teams.BAY,
    homeScore: null,
    awayScore: null,
    kickoffTime: new Date(now.getTime() + 5 * 3600000).toISOString(),
  },
  {
    id: 'match-6',
    competitionId: 'll',
    status: 'UPCOMING',
    homeTeam: teams.RMA,
    awayTeam: teams.FCB,
    homeScore: null,
    awayScore: null,
    kickoffTime: new Date(now.getTime() + 24 * 3600000).toISOString(),
  },
  {
    id: 'match-7',
    competitionId: 'ucl',
    status: 'UPCOMING',
    homeTeam: teams.JUV,
    awayTeam: teams.PSG,
    homeScore: null,
    awayScore: null,
    kickoffTime: new Date(now.getTime() + 48 * 3600000).toISOString(),
  },
  {
    id: 'match-8',
    competitionId: 'can',
    status: 'UPCOMING',
    homeTeam: teams.EGY,
    awayTeam: teams.SEN,
    homeScore: null,
    awayScore: null,
    kickoffTime: new Date(now.getTime() + 72 * 3600000).toISOString(),
  },
  // FINISHED
  {
    id: 'match-9',
    competitionId: 'l1',
    status: 'FINISHED',
    homeTeam: teams.PSG,
    awayTeam: teams.OM,
    homeScore: 3,
    awayScore: 0,
    kickoffTime: new Date(now.getTime() - 24 * 3600000).toISOString(),
    periodScores: {
      firstHalf: { home: 2, away: 0 },
      secondHalf: { home: 1, away: 0 },
    },
  },
  {
    id: 'match-10',
    competitionId: 'pl',
    status: 'FINISHED',
    homeTeam: teams.MCI,
    awayTeam: teams.LIV,
    homeScore: 2,
    awayScore: 2,
    kickoffTime: new Date(now.getTime() - 12 * 3600000).toISOString(),
    periodScores: {
      firstHalf: { home: 1, away: 1 },
      secondHalf: { home: 1, away: 1 },
    },
  },
  {
    id: 'match-11',
    competitionId: 'll',
    status: 'FINISHED',
    homeTeam: teams.RMA,
    awayTeam: teams.FCB,
    homeScore: 1,
    awayScore: 2,
    kickoffTime: new Date(now.getTime() - 6 * 3600000).toISOString(),
    periodScores: {
      firstHalf: { home: 0, away: 1 },
      secondHalf: { home: 1, away: 1 },
    },
  },
  {
    id: 'match-12',
    competitionId: 'ucl',
    status: 'FINISHED',
    homeTeam: teams.JUV,
    awayTeam: teams.BVB,
    homeScore: 0,
    awayScore: 1,
    kickoffTime: new Date(now.getTime() - 3 * 3600000).toISOString(),
    periodScores: {
      firstHalf: { home: 0, away: 1 },
      secondHalf: { home: 0, away: 0 },
    },
  },
];

// ============================================
// ANALYSES
// ============================================

const analysesMap: Record<string, MatchAnalysis> = {
  'match-1': {
    matchId: 'match-1',
    insights: [
      {
        id: 'i1',
        text: 'Les deux équipes ont marqué dans 7 sur 8 derniers matchs',
        basis: 'Basé sur les 8 derniers matchs des deux équipes',
      },
      {
        id: 'i2',
        text: 'PSG score en moyenne 2.3 buts par match à domicile',
        basis: 'Moyenne sur 10 matchs au Parc des Princes',
      },
    ],
    prediction: {
      predictedScore: '2-1',
      confidence: 78,
      methodNote: 'Modèle de Poisson appliqué aux 10 derniers matchs',
    },
    formHome: {
      teamId: 'psg',
      results: ['W', 'W', 'D', 'W', 'W'],
    },
    formAway: {
      teamId: 'om',
      results: ['L', 'W', 'D', 'L', 'W'],
    },
    h2h: {
      teamAWins: 12,
      draws: 3,
      teamBWins: 2,
    },
  },
  'match-2': {
    matchId: 'match-2',
    insights: [
      {
        id: 'i1',
        text: 'Manchester City invaincue depuis 15 matchs',
        basis: '15 matchs sans défaite toutes compétitions',
      },
      {
        id: 'i2',
        text: 'Haaland a marqué dans 6 des 8 derniers matchs',
        basis: 'Buteur régulier pour Manchester City',
      },
    ],
    prediction: {
      predictedScore: '2-1',
      confidence: 72,
      methodNote: 'Dynamique actuelle: City en hausse',
    },
    formHome: {
      teamId: 'mci',
      results: ['W', 'W', 'W', 'W', 'D'],
    },
    formAway: {
      teamId: 'liv',
      results: ['W', 'D', 'W', 'W', 'L'],
    },
    h2h: {
      teamAWins: 5,
      draws: 3,
      teamBWins: 7,
    },
  },
};

// ============================================
// MATCH STATS
// ============================================

const statsMap: Record<string, MatchStats> = {
  'match-1': {
    matchId: 'match-1',
    period: 'FULL',
    stats: [
      { label: 'Possession', home: 62, away: 38, unit: '%' },
      { label: 'Tirs', home: 15, away: 8 },
      { label: 'Tirs cadrés', home: 8, away: 3 },
      { label: 'Corners', home: 7, away: 2 },
      { label: 'Fautes', home: 10, away: 14 },
      { label: 'Hors-jeu', home: 2, away: 1 },
    ],
    cardsHome: 1,
    cardsAway: 2,
    playersToWatch: [
      {
        id: 'p1',
        name: 'Kylian Mbappé',
        teamId: 'psg',
        avatarUrl: teamLogoSvg('KM', '%234C7FD9'),
        statLabel: 'Buts',
        statValue: '2',
      },
      {
        id: 'p2',
        name: 'Dimitri Payet',
        teamId: 'om',
        avatarUrl: teamLogoSvg('DP', '%23FFFFFF'),
        statLabel: 'Passes décisives',
        statValue: '1',
      },
    ],
  },
  'match-2': {
    matchId: 'match-2',
    period: 'FULL',
    stats: [
      { label: 'Possession', home: 68, away: 32, unit: '%' },
      { label: 'Tirs', home: 14, away: 6 },
      { label: 'Tirs cadrés', home: 7, away: 2 },
      { label: 'Corners', home: 5, away: 1 },
      { label: 'Fautes', home: 8, away: 12 },
      { label: 'Hors-jeu', home: 0, away: 2 },
    ],
    cardsHome: 1,
    cardsAway: 1,
    playersToWatch: [
      {
        id: 'p3',
        name: 'Erling Haaland',
        teamId: 'mci',
        avatarUrl: teamLogoSvg('EH', '%23649FD9'),
        statLabel: 'Buts',
        statValue: '1',
      },
      {
        id: 'p4',
        name: 'Mohamed Salah',
        teamId: 'liv',
        avatarUrl: teamLogoSvg('MS', '%23C8102E'),
        statLabel: 'Passes décisives',
        statValue: '0',
      },
    ],
  },
};

// ============================================
// API FUNCTIONS
// ============================================

export async function getMatches(filter?: {
  status?: string;
  competitionId?: string;
}): Promise<Match[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      let result = [...mockMatches];
      if (filter?.status) {
        result = result.filter((m) => m.status === filter.status);
      }
      if (filter?.competitionId) {
        result = result.filter((m) => m.competitionId === filter.competitionId);
      }
      resolve(result);
    }, 300);
  });
}

export async function getMatchById(id: string): Promise<Match | null> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockMatches.find((m) => m.id === id) || null);
    }, 300);
  });
}

export async function getCompetitions(): Promise<Competition[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockCompetitions);
    }, 200);
  });
}

export async function getMatchAnalysis(
  matchId: string
): Promise<MatchAnalysis | null> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(analysesMap[matchId] || null);
    }, 250);
  });
}

export async function getMatchStats(
  matchId: string,
  period?: string
): Promise<MatchStats | null> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(statsMap[matchId] || null);
    }, 250);
  });
}
