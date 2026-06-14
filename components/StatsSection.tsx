'use client';

import { useState } from 'react';
import { MatchStats, TeamStats, PlayerStat } from '@/lib/types';

interface StatsSectionProps {
  stats: MatchStats;
}

type Period = 'FULL' | 'FIRST_HALF' | 'SECOND_HALF';

export function StatsSection({ stats }: StatsSectionProps) {
  const [period, setPeriod] = useState<Period>('FULL');

  return (
    <div className="space-y-4">
      {/* Period Selector */}
      <div className="bg-card-bg rounded-lg p-1 flex">
        {(['FULL', 'FIRST_HALF', 'SECOND_HALF'] as Period[]).map((p) => (
          <button
            key={p}
            onClick={() => setPeriod(p)}
            className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
              period === p
                ? 'bg-accent text-black'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            {p === 'FULL' ? 'Tout' : p === 'FIRST_HALF' ? '1ère MT' : '2ème MT'}
          </button>
        ))}
      </div>

      {/* Comparative Stats */}
      <div className="bg-card-bg border border-border-dark rounded-xl p-4 space-y-4">
        <StatBar
          label="Possession"
          home={stats.homeTeamStats.possession}
          away={stats.awayTeamStats.possession}
          unit="%"
        />
        <StatBar
          label="Tirs"
          home={stats.homeTeamStats.shots}
          away={stats.awayTeamStats.shots}
        />
        <StatBar
          label="Tirs cadrés"
          home={stats.homeTeamStats.shotsOnTarget}
          away={stats.awayTeamStats.shotsOnTarget}
        />
        <StatBar
          label="Corners"
          home={stats.homeTeamStats.corners}
          away={stats.awayTeamStats.corners}
        />
        <StatBar
          label="Fautes"
          home={stats.homeTeamStats.fouls}
          away={stats.awayTeamStats.fouls}
        />
        <StatBar
          label="Hors-jeu"
          home={stats.homeTeamStats.offsides}
          away={stats.awayTeamStats.offsides}
        />
      </div>

      {/* Cards */}
      <div className="bg-card-bg border border-border-dark rounded-xl p-4">
        <h3 className="text-sm font-medium text-gray-400 mb-3">Cartons</h3>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            {Array.from({ length: stats.homeTeamStats.yellowCards }).map((_, i) => (
              <div key={i} className="w-4 h-6 bg-yellow-500 rounded-sm" />
            ))}
            {stats.homeTeamStats.redCards > 0 && (
              <div className="w-4 h-6 bg-red-500 rounded-sm" />
            )}
          </div>
          <div className="flex items-center gap-2">
            {Array.from({ length: stats.awayTeamStats.yellowCards }).map((_, i) => (
              <div key={i} className="w-4 h-6 bg-yellow-500 rounded-sm" />
            ))}
            {stats.awayTeamStats.redCards > 0 && (
              <div className="w-4 h-6 bg-red-500 rounded-sm" />
            )}
          </div>
        </div>
      </div>

      {/* Players to Watch */}
      <div className="bg-card-bg border border-border-dark rounded-xl p-4">
        <h3 className="text-sm font-medium text-gray-400 mb-3">Joueurs à suivre</h3>
        <div className="space-y-2">
          {stats.playersToWatch.map((player) => (
            <PlayerCard key={player.id} player={player} />
          ))}
        </div>
      </div>
    </div>
  );
}

interface StatBarProps {
  label: string;
  home: number;
  away: number;
  unit?: string;
}

function StatBar({ label, home, away, unit = '' }: StatBarProps) {
  const total = home + away;
  const homePercent = total > 0 ? (home / total) * 100 : 50;
  const awayPercent = total > 0 ? (away / total) * 100 : 50;

  return (
    <div>
      <div className="flex justify-between text-sm mb-1">
        <span className="font-medium text-white">{home}{unit}</span>
        <span className="text-gray-400">{label}</span>
        <span className="font-medium text-white">{away}{unit}</span>
      </div>
      <div className="flex h-2 rounded-full overflow-hidden bg-border-dark">
        <div
          className="bg-accent transition-all duration-300"
          style={{ width: `${homePercent}%` }}
        />
        <div
          className="bg-gray-500 transition-all duration-300"
          style={{ width: `${awayPercent}%` }}
        />
      </div>
    </div>
  );
}

function PlayerCard({ player }: { player: PlayerStat }) {
  return (
    <div className="flex items-center gap-3 p-2 bg-background rounded-lg">
      <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center text-accent font-bold text-sm">
        {player.name.split(' ').map(n => n[0]).join('')}
      </div>
      <div className="flex-1">
        <p className="text-sm font-medium text-white">{player.name}</p>
        <p className="text-xs text-gray-500">{player.team.code} • {player.position}</p>
      </div>
      <div className="text-right">
        <p className="text-sm font-medium text-accent">
          {player.goals > 0 && `${player.goals} ⚽`}
          {player.assists > 0 && ` ${player.assists} 🎯`}
        </p>
      </div>
    </div>
  );
}
