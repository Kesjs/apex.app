import {
  Match,
  PreMatchAnalysis,
  MatchStats,
  MatchStatus,
  Team,
  PlayerStat,
} from './types';

// ============================================
// TEAMS - Multi-league
// ============================================

const teams: Record<string, Team> = {
  // Ligue 1
  PSG: { id: '1', name: 'Paris Saint-Germain', code: 'PSG', logo: '🔴' },
  OM: { id: '2', name: 'Olympique Marseille', code: 'OM', logo: '🔵' },
  OL: { id: '3', name: 'Olympique Lyonnais', code: 'OL', logo: '⚪' },
  NICE: { id: '4', name: 'OGC Nice', code: 'NICE', logo: '🟤' },
  MONACO: { id: '5', name: 'AS Monaco', code: 'MONACO', logo: '🔴' },
  LENS: { id: '6', name: 'RC Lens', code: 'LENS', logo: '🟡' },
  RENNES: { id: '7', name: 'Stade Rennes', code: 'RENNES', logo: '🔴' },
  LILLE: { id: '8', name: 'LOSC Lille', code: 'LILLE', logo: '⚫' },

  // Premier League
  MU: { id: '9', name: 'Manchester United', code: 'MU', logo: '🔴' },
  MC: { id: '10', name: 'Manchester City', code: 'MC', logo: '🔵' },
  LIV: { id: '11', name: 'Liverpool', code: 'LIV', logo: '🔴' },
  ARS: { id: '12', name: 'Arsenal', code: 'ARS', logo: '🔴' },
  CHE: { id: '13', name: 'Chelsea', code: 'CHE', logo: '🔵' },
  TOT: { id: '14', name: 'Tottenham', code: 'TOT', logo: '⚪' },

  // La Liga
  RMA: { id: '15', name: 'Real Madrid', code: 'RMA', logo: '⚪' },
  FCB: { id: '16', name: 'FC Barcelona', code: 'FCB', logo: '🔵' },
  ATM: { id: '17', name: 'Atlético Madrid', code: 'ATM', logo: '🔴' },
  RVS: { id: '18', name: 'Sevilla', code: 'RVS', logo: '🔴' },

  // Serie A
  JUV: { id: '19', name: 'Juventus', code: 'JUV', logo: '⚫' },
  ITA: { id: '20', name: 'Inter Milan', code: 'ITA', logo: '🔵' },
  ACM: { id: '21', name: 'AC Milan', code: 'ACM', logo: '🔴' },
  LAZ: { id: '22', name: 'Lazio', code: 'LAZ', logo: '🔵' },
};

// ============================================
// MATCHES - Multiple leagues, all statuses
// ============================================

export const mockMatches: Match[] = [
  // LIVE NOW
  {
    id: 'match-1',
    homeTeam: teams.PSG,
    awayTeam: teams.OM,
    status: 'LIVE',
    score: { home: 2, away: 1 },
    startTime: new Date(Date.now() - 45 * 60 * 1000),
    competition: 'Ligue 1',
    timeline: [
      {
        minute: 8,
        type: 'GOAL',
        team: 'home',
        player: 'Kylian Mbappé',
        description: 'But PSG - Centre Ousmane Dembélé',
      },
      {
        minute: 22,
        type: 'GOAL',
        team: 'away',
        player: 'Pierre-Emerick Aubameyang',
        description: 'But Marseille - Contre-attaque',
      },
      {
        minute: 35,
        type: 'CARD',
        team: 'away',
        description: 'Carton jaune - Faute sur Dembélé',
      },
      {
        minute: 41,
        type: 'GOAL',
        team: 'home',
        player: 'Marco Verratti',
        description: 'But PSG - Coup franc',
      },
    ],
  },

  {
    id: 'match-2',
    homeTeam: teams.MC,
    awayTeam: teams.LIV,
    status: 'LIVE',
    score: { home: 1, away: 1 },
    startTime: new Date(Date.now() - 60 * 60 * 1000),
    competition: 'Premier League',
    timeline: [
      {
        minute: 12,
        type: 'GOAL',
        team: 'home',
        player: 'Erling Haaland',
        description: 'But Manchester City',
      },
      {
        minute: 38,
        type: 'GOAL',
        team: 'away',
        player: 'Mohamed Salah',
        description: 'But Liverpool',
      },
    ],
  },

  // UPCOMING
  {
    id: 'match-3',
    homeTeam: teams.RMA,
    awayTeam: teams.FCB,
    status: 'UPCOMING',
    score: { home: 0, away: 0 },
    startTime: new Date(Date.now() + 3 * 60 * 60 * 1000),
    competition: 'La Liga',
    timeline: [],
  },

  {
    id: 'match-4',
    homeTeam: teams.OL,
    awayTeam: teams.LENS,
    status: 'UPCOMING',
    score: { home: 0, away: 0 },
    startTime: new Date(Date.now() + 5 * 60 * 60 * 1000),
    competition: 'Ligue 1',
    timeline: [],
  },

  {
    id: 'match-5',
    homeTeam: teams.ITA,
    awayTeam: teams.JUV,
    status: 'UPCOMING',
    score: { home: 0, away: 0 },
    startTime: new Date(Date.now() + 24 * 60 * 60 * 1000),
    competition: 'Serie A',
    timeline: [],
  },

  {
    id: 'match-6',
    homeTeam: teams.ARS,
    awayTeam: teams.MU,
    status: 'UPCOMING',
    score: { home: 0, away: 0 },
    startTime: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
    competition: 'Premier League',
    timeline: [],
  },

  // FINISHED
  {
    id: 'match-7',
    homeTeam: teams.NICE,
    awayTeam: teams.PSG,
    status: 'FINISHED',
    score: { home: 1, away: 3 },
    startTime: new Date(Date.now() - 24 * 60 * 60 * 1000),
    competition: 'Ligue 1',
    timeline: [
      {
        minute: 12,
        type: 'GOAL',
        team: 'away',
        player: 'Kylian Mbappé',
        description: 'But PSG',
      },
      {
        minute: 34,
        type: 'GOAL',
        team: 'home',
        player: 'Evann Guessand',
        description: 'But Nice',
      },
      {
        minute: 67,
        type: 'GOAL',
        team: 'away',
        player: 'Ousmane Dembélé',
        description: 'But PSG',
      },
      {
        minute: 89,
        type: 'GOAL',
        team: 'away',
        player: 'Marco Verratti',
        description: 'But PSG',
      },
    ],
  },

  {
    id: 'match-8',
    homeTeam: teams.CHE,
    awayTeam: teams.TOT,
    status: 'FINISHED',
    score: { home: 2, away: 0 },
    startTime: new Date(Date.now() - 12 * 60 * 60 * 1000),
    competition: 'Premier League',
    timeline: [
      {
        minute: 23,
        type: 'GOAL',
        team: 'home',
        player: 'Cole Palmer',
        description: 'But Chelsea',
      },
      {
        minute: 76,
        type: 'GOAL',
        team: 'home',
        player: 'Reece James',
        description: 'But Chelsea',
      },
    ],
  },

  {
    id: 'match-9',
    homeTeam: teams.ACM,
    awayTeam: teams.LAZ,
    status: 'FINISHED',
    score: { home: 1, away: 2 },
    startTime: new Date(Date.now() - 6 * 60 * 60 * 1000),
    competition: 'Serie A',
    timeline: [
      {
        minute: 15,
        type: 'GOAL',
        team: 'away',
        player: 'Ciro Immobile',
        description: 'But Lazio',
      },
      {
        minute: 52,
        type: 'GOAL',
        team: 'home',
        player: 'Rafael Leão',
        description: 'But AC Milan',
      },
      {
        minute: 88,
        type: 'GOAL',
        team: 'away',
        player: 'Luis Alberto',
        description: 'But Lazio',
      },
    ],
  },

  {
    id: 'match-10',
    homeTeam: teams.ATM,
    awayTeam: teams.RVS,
    status: 'FINISHED',
    score: { home: 1, away: 1 },
    startTime: new Date(Date.now() - 36 * 60 * 60 * 1000),
    competition: 'La Liga',
    timeline: [
      {
        minute: 28,
        type: 'GOAL',
        team: 'home',
        player: 'Álvaro Morata',
        description: 'But Atlético',
      },
      {
        minute: 64,
        type: 'GOAL',
        team: 'away',
        player: 'Youssef En-Nesyri',
        description: 'But Séville',
      },
    ],
  },
];

// ============================================
// PRE-MATCH ANALYSES
// ============================================

const analysisMap: Record<string, PreMatchAnalysis> = {
  'match-1': {
    insights: [
      {
        title: 'Derby domination',
        description: 'PSG remporte 73% des Classico à domicile',
        calculation: '11 victoires / 15 matchs au Parc',
        icon: '👑',
      },
      {
        title: 'Buteurs en forme',
        description: 'Mbappé a marqué dans 8/12 derniers matchs',
        calculation: 'Moyenne de 1.2 but par match',
        icon: '⚽',
      },
      {
        title: 'Matchs offensifs',
        description: 'Les 3 derniers Classico ont eu 3+ buts',
        calculation: '3-1, 4-0, 2-2 (derniers résultats)',
        icon: '🔥',
      },
    ],
    poissonPrediction: {
      homeGoals: 2.1,
      awayGoals: 0.9,
      confidence: 82,
      methodology: 'Modèle Poisson + historique Derby',
    },
    formData: [
      {
        team: teams.PSG,
        last5: ['W', 'W', 'W', 'D', 'W'],
      },
      {
        team: teams.OM,
        last5: ['W', 'D', 'L', 'W', 'L'],
      },
    ],
    h2h: {
      homeWins: 11,
      draws: 3,
      awayWins: 1,
    },
  },

  'match-3': {
    insights: [
      {
        title: 'Clash au sommet',
        description: 'Real Madrid en meilleure forme (10/12 victoires)',
        calculation: 'Forme récente: 5 victoires consécutives',
        icon: '👑',
      },
      {
        title: 'Vizzà offensive',
        description: 'Barcelona a 0.8 but par match en L1',
        calculation: '4 buts en 5 matchs',
        icon: '⚽',
      },
      {
        title: 'Tactiques défensives',
        description: 'Les Classicos sont généralement serrés',
        calculation: 'Derniers matchs: 1-1, 0-0, 2-1',
        icon: '🛡️',
      },
    ],
    poissonPrediction: {
      homeGoals: 1.6,
      awayGoals: 0.8,
      confidence: 75,
      methodology: 'Analyse tactique + possession moyenne',
    },
    formData: [
      {
        team: teams.RMA,
        last5: ['W', 'W', 'W', 'W', 'W'],
      },
      {
        team: teams.FCB,
        last5: ['D', 'W', 'L', 'W', 'W'],
      },
    ],
    h2h: {
      homeWins: 8,
      draws: 5,
      awayWins: 2,
    },
  },

  'match-2': {
    insights: [
      {
        title: 'Bataille des titans',
        description: 'Manchester City en meilleure forme (9/10 victoires)',
        calculation: 'Possessions moyennes: 68%',
        icon: '👑',
      },
      {
        title: 'Haaland en feu',
        description: '22 buts en 19 matchs pour Erling Haaland',
        calculation: '1.16 but par match',
        icon: '⚽',
      },
      {
        title: 'Salah réactif',
        description: 'Liverpool domine généralement la possession face à City',
        calculation: 'Derniers: 1-1, 2-2, 3-2',
        icon: '🔄',
      },
    ],
    poissonPrediction: {
      homeGoals: 1.9,
      awayGoals: 1.1,
      confidence: 76,
      methodology: 'Modèle dynamique Premier League',
    },
    formData: [
      {
        team: teams.MC,
        last5: ['W', 'W', 'W', 'D', 'W'],
      },
      {
        team: teams.LIV,
        last5: ['W', 'W', 'L', 'W', 'W'],
      },
    ],
    h2h: {
      homeWins: 6,
      draws: 2,
      awayWins: 7,
    },
  },
};

export function getPreMatchAnalysis(matchId: string): PreMatchAnalysis {
  return analysisMap[matchId] || analysisMap['match-1'];
}

// ============================================
// MATCH STATS
// ============================================

const statsMap: Record<string, MatchStats> = {
  'match-1': {
    matchId: 'match-1',
    homeTeamStats: {
      team: teams.PSG,
      possession: 62,
      shots: 15,
      shotsOnTarget: 8,
      corners: 7,
      fouls: 8,
      offsides: 2,
      yellowCards: 2,
      redCards: 0,
    },
    awayTeamStats: {
      team: teams.OM,
      possession: 38,
      shots: 9,
      shotsOnTarget: 4,
      corners: 3,
      fouls: 12,
      offsides: 1,
      yellowCards: 3,
      redCards: 0,
    },
    playersToWatch: [
      {
        id: 'p1',
        name: 'Kylian Mbappé',
        team: teams.PSG,
        position: 'Ailier',
        goals: 2,
        assists: 1,
      },
      {
        id: 'p2',
        name: 'Marco Verratti',
        team: teams.PSG,
        position: 'Milieu',
        goals: 1,
        assists: 0,
      },
      {
        id: 'p3',
        name: 'Pierre-Emerick Aubameyang',
        team: teams.OM,
        position: 'Attaquant',
        goals: 1,
        assists: 0,
      },
    ],
    period: 'FULL',
  },

  'match-2': {
    matchId: 'match-2',
    homeTeamStats: {
      team: teams.MC,
      possession: 68,
      shots: 14,
      shotsOnTarget: 7,
      corners: 5,
      fouls: 6,
      offsides: 0,
      yellowCards: 1,
      redCards: 0,
    },
    awayTeamStats: {
      team: teams.LIV,
      possession: 32,
      shots: 8,
      shotsOnTarget: 4,
      corners: 2,
      fouls: 9,
      offsides: 3,
      yellowCards: 2,
      redCards: 0,
    },
    playersToWatch: [
      {
        id: 'p4',
        name: 'Erling Haaland',
        team: teams.MC,
        position: 'Attaquant',
        goals: 1,
        assists: 0,
      },
      {
        id: 'p5',
        name: 'Mohamed Salah',
        team: teams.LIV,
        position: 'Ailier',
        goals: 1,
        assists: 1,
      },
      {
        id: 'p6',
        name: 'Ilkay Gündoğan',
        team: teams.MC,
        position: 'Milieu',
        goals: 0,
        assists: 1,
      },
    ],
    period: 'FULL',
  },
};

export function getMatchStats(matchId: string): MatchStats {
  return statsMap[matchId] || statsMap['match-1'];
}

// ============================================
// HELPER FUNCTIONS
// ============================================

export function getMatchById(id: string): Match | undefined {
  return mockMatches.find((m) => m.id === id);
}

export function getMatchesByStatus(status: MatchStatus): Match[] {
  return mockMatches.filter((m) => m.status === status);
}

export function getUpcomingMatches(): Match[] {
  return getMatchesByStatus('UPCOMING');
}

export function getLiveMatches(): Match[] {
  return getMatchesByStatus('LIVE');
}

export function getFinishedMatches(): Match[] {
  return getMatchesByStatus('FINISHED');
}

export function getMatchesByCompetition(competition: string): Match[] {
  return mockMatches.filter((m) => m.competition === competition);
}

export function getAllCompetitions(): string[] {
  return [...new Set(mockMatches.map((m) => m.competition))];
}
