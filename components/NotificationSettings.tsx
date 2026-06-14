'use client';

import { useState, useEffect } from 'react';
import { Bell, BellOff } from 'lucide-react';
import { 
  requestNotificationPermission,
  getNotificationSettings,
  saveNotificationSettings,
  NotificationSettings,
} from '@/lib/notifications';

export function NotificationToggle() {
  const [isEnabled, setIsEnabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'Notification' in window) {
      setIsEnabled(Notification.permission === 'granted');
    }
  }, []);

  const handleToggle = async () => {
    setIsLoading(true);
    const granted = await requestNotificationPermission();
    setIsEnabled(granted);
    setIsLoading(false);
  };

  return (
    <button
      onClick={handleToggle}
      disabled={isLoading}
      className="flex items-center gap-2 px-3 py-2 rounded-lg bg-card-bg border border-border-dark hover:border-accent/50 transition-colors disabled:opacity-50"
      title={isEnabled ? 'Notifications activées' : 'Activer les notifications'}
    >
      {isEnabled ? (
        <>
          <Bell className="w-5 h-5 text-accent" />
          <span className="text-sm text-accent">On</span>
        </>
      ) : (
        <>
          <BellOff className="w-5 h-5 text-gray-400" />
          <span className="text-sm text-gray-400">Off</span>
        </>
      )}
    </button>
  );
}

export function NotificationPreferences() {
  const [settings, setSettings] = useState<NotificationSettings>({
    goals: true,
    matchStart: true,
    oddsChange: false,
    watchlistAlerts: true,
  });

  useEffect(() => {
    setSettings(getNotificationSettings());
  }, []);

  const handleChange = (key: keyof NotificationSettings) => {
    const updated = { ...settings, [key]: !settings[key] };
    setSettings(updated);
    saveNotificationSettings(updated);
  };

  return (
    <div className="bg-card-bg border border-border-dark rounded-xl p-4 space-y-3">
      <h3 className="text-sm font-semibold text-white mb-4">Préférences de notifications</h3>

      <label className="flex items-center gap-3 cursor-pointer">
        <input
          type="checkbox"
          checked={settings.goals}
          onChange={() => handleChange('goals')}
          className="w-4 h-4 rounded accent-color"
        />
        <span className="text-sm text-gray-300">Buts marqués</span>
      </label>

      <label className="flex items-center gap-3 cursor-pointer">
        <input
          type="checkbox"
          checked={settings.matchStart}
          onChange={() => handleChange('matchStart')}
          className="w-4 h-4 rounded accent-color"
        />
        <span className="text-sm text-gray-300">Coup d'envoi des matchs</span>
      </label>

      <label className="flex items-center gap-3 cursor-pointer">
        <input
          type="checkbox"
          checked={settings.oddsChange}
          onChange={() => handleChange('oddsChange')}
          className="w-4 h-4 rounded accent-color"
        />
        <span className="text-sm text-gray-300">Changements de cotes</span>
      </label>

      <label className="flex items-center gap-3 cursor-pointer">
        <input
          type="checkbox"
          checked={settings.watchlistAlerts}
          onChange={() => handleChange('watchlistAlerts')}
          className="w-4 h-4 rounded accent-color"
        />
        <span className="text-sm text-gray-300">Alertes watchlist</span>
      </label>
    </div>
  );
}
