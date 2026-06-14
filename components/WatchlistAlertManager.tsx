'use client';

import { useState } from 'react';
import { Plus, X } from 'lucide-react';
import {
  addAlert,
  removeAlert,
  getMatchAlerts,
  getAlertLabel,
  AlertCondition,
} from '@/lib/watchlist';
import { BottomSheet, useBottomSheet } from './BottomSheet';

interface WatchlistAlertManagerProps {
  matchId: string;
  team: string;
}

const conditions: { value: AlertCondition; label: string }[] = [
  { value: 'possession', label: 'Possession (%)' },
  { value: 'shots', label: 'Tirs' },
  { value: 'corners', label: 'Corners' },
  { value: 'goals_scored', label: 'Buts marqués' },
];

export function WatchlistAlertManager({ matchId, team }: WatchlistAlertManagerProps) {
  const [condition, setCondition] = useState<AlertCondition>('possession');
  const [threshold, setThreshold] = useState('50');
  const [alerts, setAlerts] = useState(getMatchAlerts(matchId));
  const { isOpen, open, close } = useBottomSheet();

  const handleAddAlert = () => {
    if (addAlert(matchId, condition, parseInt(threshold), 'home')) {
      setAlerts(getMatchAlerts(matchId));
      setThreshold('50');
      setCondition('possession');
    }
  };

  const handleRemoveAlert = (alertId: string) => {
    removeAlert(matchId, alertId);
    setAlerts(getMatchAlerts(matchId));
  };

  return (
    <>
      <button
        onClick={open}
        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-card-bg border border-border-dark hover:border-accent/50 transition-colors text-sm font-medium text-gray-400 hover:text-white"
      >
        <Plus className="w-4 h-4" />
        Alertes ({alerts.length})
      </button>

      <BottomSheet isOpen={isOpen} onClose={close} title="Gérer les alertes">
        <div className="space-y-4">
          {/* Add Alert Form */}
          <div className="space-y-3 pb-4 border-b border-border-dark">
            <div>
              <label className="text-xs text-gray-400 block mb-2">Condition</label>
              <select
                value={condition}
                onChange={(e) => setCondition(e.target.value as AlertCondition)}
                className="w-full bg-background border border-border-dark rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-accent"
              >
                {conditions.map((c) => (
                  <option key={c.value} value={c.value}>
                    {c.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs text-gray-400 block mb-2">Seuil</label>
              <input
                type="number"
                value={threshold}
                onChange={(e) => setThreshold(e.target.value)}
                min="0"
                max="100"
                className="w-full bg-background border border-border-dark rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-accent"
              />
            </div>

            <button
              onClick={handleAddAlert}
              className="w-full bg-accent text-black py-2 rounded-lg font-medium hover:bg-accent/90 transition-colors"
            >
              Ajouter alerte
            </button>
          </div>

          {/* Active Alerts */}
          <div className="space-y-2">
            <p className="text-xs text-gray-400 font-medium">Alertes actives</p>
            {alerts.length === 0 ? (
              <p className="text-sm text-gray-500">Aucune alerte configurée</p>
            ) : (
              alerts.map((alert) => (
                <div
                  key={alert.id}
                  className="flex items-center justify-between gap-2 p-3 bg-background rounded-lg border border-border-dark"
                >
                  <span className="text-sm text-white">
                    {getAlertLabel(alert.condition, alert.threshold, 'Équipe')}
                  </span>
                  <button
                    onClick={() => handleRemoveAlert(alert.id)}
                    className="p-1 hover:bg-border-dark rounded transition-colors"
                    aria-label="Supprimer l'alerte"
                  >
                    <X className="w-4 h-4 text-gray-400" />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </BottomSheet>
    </>
  );
}
