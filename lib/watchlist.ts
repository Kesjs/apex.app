// Watchlist Management

export type AlertCondition = 'possession' | 'shots' | 'corners' | 'goals_scored' | 'goals_conceded';

export interface WatchlistAlert {
  id: string;
  matchId: string;
  condition: AlertCondition;
  threshold: number;
  team: 'home' | 'away';
  triggered: boolean;
}

export interface WatchlistMatch {
  id: string;
  homeTeam: string;
  awayTeam: string;
  competition: string;
  alerts: WatchlistAlert[];
  addedAt: number;
}

const WATCHLIST_KEY = 'apex_watchlist';

export function getWatchlist(): WatchlistMatch[] {
  if (typeof window === 'undefined') return [];
  const stored = localStorage.getItem(WATCHLIST_KEY);
  return stored ? JSON.parse(stored) : [];
}

export function saveWatchlist(watchlist: WatchlistMatch[]) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(WATCHLIST_KEY, JSON.stringify(watchlist));
}

export function addToWatchlist(
  matchId: string,
  homeTeam: string,
  awayTeam: string,
  competition: string
): boolean {
  const watchlist = getWatchlist();
  
  if (watchlist.some(m => m.id === matchId)) {
    return false; // Already in watchlist
  }

  watchlist.push({
    id: matchId,
    homeTeam,
    awayTeam,
    competition,
    alerts: [],
    addedAt: Date.now(),
  });

  saveWatchlist(watchlist);
  return true;
}

export function removeFromWatchlist(matchId: string) {
  const watchlist = getWatchlist();
  const filtered = watchlist.filter(m => m.id !== matchId);
  saveWatchlist(filtered);
}

export function isInWatchlist(matchId: string): boolean {
  return getWatchlist().some(m => m.id === matchId);
}

export function addAlert(
  matchId: string,
  condition: AlertCondition,
  threshold: number,
  team: 'home' | 'away'
): boolean {
  const watchlist = getWatchlist();
  const match = watchlist.find(m => m.id === matchId);

  if (!match) return false;

  const alertId = `${condition}-${team}-${threshold}-${Date.now()}`;
  match.alerts.push({
    id: alertId,
    matchId,
    condition,
    threshold,
    team,
    triggered: false,
  });

  saveWatchlist(watchlist);
  return true;
}

export function removeAlert(matchId: string, alertId: string) {
  const watchlist = getWatchlist();
  const match = watchlist.find(m => m.id === matchId);

  if (match) {
    match.alerts = match.alerts.filter(a => a.id !== alertId);
    saveWatchlist(watchlist);
  }
}

export function getMatchAlerts(matchId: string): WatchlistAlert[] {
  const watchlist = getWatchlist();
  const match = watchlist.find(m => m.id === matchId);
  return match?.alerts || [];
}

export function checkAlertCondition(
  condition: AlertCondition,
  currentValue: number,
  threshold: number
): boolean {
  switch (condition) {
    case 'possession':
    case 'shots':
    case 'corners':
    case 'goals_scored':
      return currentValue >= threshold;
    case 'goals_conceded':
      return currentValue >= threshold;
    default:
      return false;
  }
}

export function getAlertLabel(condition: AlertCondition, threshold: number, team: string): string {
  const labels: Record<AlertCondition, string> = {
    possession: `Possession > ${threshold}%`,
    shots: `${threshold}+ tirs`,
    corners: `${threshold}+ corners`,
    goals_scored: `${threshold}+ buts marqués`,
    goals_conceded: `${threshold}+ buts concédés`,
  };

  return `${team}: ${labels[condition]}`;
}
