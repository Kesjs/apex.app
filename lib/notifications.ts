// Service Worker Notifications Management

export interface NotificationPayload {
  title: string;
  body: string;
  icon?: string;
  badge?: string;
  tag?: string;
  data?: Record<string, any>;
}

export async function registerServiceWorker() {
  if (!('serviceWorker' in navigator)) return;
  
  try {
    const registration = await navigator.serviceWorker.register('/sw.js');
    console.log('Service Worker registered:', registration);
    return registration;
  } catch (error) {
    console.error('Service Worker registration failed:', error);
  }
}

export async function requestNotificationPermission() {
  if (!('Notification' in window)) {
    console.log('Notifications not supported');
    return false;
  }

  if (Notification.permission === 'granted') {
    return true;
  }

  if (Notification.permission !== 'denied') {
    const permission = await Notification.requestPermission();
    return permission === 'granted';
  }

  return false;
}

export async function showNotification(payload: NotificationPayload) {
  if (!('serviceWorker' in navigator) || !('Notification' in window)) {
    return;
  }

  if (Notification.permission !== 'granted') {
    return;
  }

  const registration = await navigator.serviceWorker.ready;
  
  registration.showNotification(payload.title, {
    body: payload.body,
    icon: payload.icon || '/apex_logo_concept_no_dot.png',
    badge: payload.badge || '/apex_logo_concept_no_dot.png',
    tag: payload.tag || 'apex-notification',
    data: payload.data,
  });
}

// Specific notification helpers
export async function notifyGoal(homeTeam: string, awayTeam: string, scorer: string) {
  await showNotification({
    title: '⚽ BUT!',
    body: `${scorer} marque pour ${homeTeam} vs ${awayTeam}`,
    tag: `goal-${Date.now()}`,
    data: { type: 'goal', homeTeam, awayTeam, scorer },
  });
}

export async function notifyMatchStart(homeTeam: string, awayTeam: string, competition: string) {
  await showNotification({
    title: '🎮 Coup d\'envoi',
    body: `${homeTeam} vs ${awayTeam} - ${competition}`,
    tag: `match-start-${Date.now()}`,
    data: { type: 'matchStart', homeTeam, awayTeam, competition },
  });
}

export async function notifyOddsChange(homeTeam: string, awayTeam: string, oldOdds: number, newOdds: number) {
  const direction = newOdds > oldOdds ? '📈' : '📉';
  await showNotification({
    title: `${direction} Cotes changées`,
    body: `${homeTeam} vs ${awayTeam}: ${oldOdds.toFixed(2)} → ${newOdds.toFixed(2)}`,
    tag: `odds-${Date.now()}`,
    data: { type: 'odds', homeTeam, awayTeam, oldOdds, newOdds },
  });
}

export async function notifyWatchlistAlert(matchup: string, condition: string) {
  await showNotification({
    title: '🔔 Alerte Watchlist',
    body: `${matchup}: ${condition}`,
    tag: `alert-${Date.now()}`,
    data: { type: 'watchlistAlert', matchup, condition },
  });
}

// Store notification preferences
export function saveNotificationPreference(key: string, value: boolean) {
  if (typeof window !== 'undefined') {
    localStorage.setItem(`notify_${key}`, JSON.stringify(value));
  }
}

export function getNotificationPreference(key: string, defaultValue: boolean = true): boolean {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem(`notify_${key}`);
    return stored !== null ? JSON.parse(stored) : defaultValue;
  }
  return defaultValue;
}

export interface NotificationSettings {
  goals: boolean;
  matchStart: boolean;
  oddsChange: boolean;
  watchlistAlerts: boolean;
}

export function getNotificationSettings(): NotificationSettings {
  return {
    goals: getNotificationPreference('goals', true),
    matchStart: getNotificationPreference('matchStart', true),
    oddsChange: getNotificationPreference('oddsChange', false),
    watchlistAlerts: getNotificationPreference('watchlistAlerts', true),
  };
}

export function saveNotificationSettings(settings: NotificationSettings) {
  Object.entries(settings).forEach(([key, value]) => {
    saveNotificationPreference(key, value);
  });
}
