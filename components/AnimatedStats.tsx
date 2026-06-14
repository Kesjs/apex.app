'use client';

import { MatchStats } from '@/lib/types';
import { cn } from '@/lib/utils';

interface AnimatedStatBarProps {
  label: string;
  home: number;
  away: number;
  unit?: string;
  delay: number;
}

function AnimatedStatBar({ label, home, away, unit = '', delay }: AnimatedStatBarProps) {
  const total = home + away;
  const homePercent = total > 0 ? (home / total) * 100 : 50;
  const awayPercent = total > 0 ? (away / total) * 100 : 50;

  return (
    <div
      className="fade-scale-enter"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex justify-between text-sm mb-1">
        <span className="font-medium text-white">{home}{unit}</span>
        <span className="text-gray-400">{label}</span>
        <span className="font-medium text-white">{away}{unit}</span>
      </div>
      <div className="flex h-2 rounded-full overflow-hidden bg-border-dark">
        <div
          className={cn('bg-accent transition-all duration-300 bar-fill')}
          style={{
            width: `${homePercent}%`,
            animationDelay: `${delay + 100}ms`,
          }}
        />
        <div
          className={cn('bg-gray-500 transition-all duration-300 bar-fill')}
          style={{
            width: `${awayPercent}%`,
            animationDelay: `${delay + 150}ms`,
          }}
        />
      </div>
    </div>
  );
}

export function AnimatedStatsSection({ stats }: { stats: MatchStats }) {
  return (
    <div className="space-y-4">
      {/* Stats Comparatives */}
      <div className="bg-card-bg border border-border-dark rounded-xl p-4 space-y-4 fade-scale-enter">
        <AnimatedStatBar
          label="Possession"
          home={stats.homeTeamStats.possession}
          away={stats.awayTeamStats.possession}
          unit="%"
          delay={0}
        />
        <AnimatedStatBar
          label="Tirs"
          home={stats.homeTeamStats.shots}
          away={stats.awayTeamStats.shots}
          delay={80}
        />
        <AnimatedStatBar
          label="Tirs cadrés"
          home={stats.homeTeamStats.shotsOnTarget}
          away={stats.awayTeamStats.shotsOnTarget}
          delay={160}
        />
        <AnimatedStatBar
          label="Corners"
          home={stats.homeTeamStats.corners}
          away={stats.awayTeamStats.corners}
          delay={240}
        />
        <AnimatedStatBar
          label="Fautes"
          home={stats.homeTeamStats.fouls}
          away={stats.awayTeamStats.fouls}
          delay={320}
        />
        <AnimatedStatBar
          label="Hors-jeu"
          home={stats.homeTeamStats.offsides}
          away={stats.awayTeamStats.offsides}
          delay={400}
        />
      </div>

      {/* Cards */}
      <div
        className="bg-card-bg border border-border-dark rounded-xl p-4 fade-scale-enter fade-scale-delay-1"
      >
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
      <div
        className="bg-card-bg border border-border-dark rounded-xl p-4 fade-scale-enter fade-scale-delay-2"
      >
        <h3 className="text-sm font-medium text-gray-400 mb-3">Joueurs à suivre</h3>
        <div className="space-y-2">
          {stats.playersToWatch.map((player, idx) => (
            <div
              key={player.id}
              className="flex items-center gap-3 p-2 bg-background rounded-lg fade-scale-enter"
              style={{ animationDelay: `${300 + idx * 80}ms` }}
            >
              <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center text-accent font-bold text-sm">
                {player.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-white">{player.name}</p>
                <p className="text-xs text-gray-500">{player.team.code} • {player.position}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-accent number-pop">
                  {player.goals > 0 && `${player.goals} ⚽`}
                  {player.assists > 0 && ` ${player.assists} 🎯`}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
