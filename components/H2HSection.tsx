'use client';

import { H2HData, Team } from '@/lib/types';

interface H2HSectionProps {
  h2h: H2HData;
  homeTeam: Team;
  awayTeam: Team;
}

export function H2HSection({ h2h, homeTeam, awayTeam }: H2HSectionProps) {
  return (
    <div className="bg-card-bg border border-border-dark rounded-xl p-4">
      <h3 className="text-sm font-medium text-gray-400 mb-4">Historique H2H</h3>

      <div className="grid grid-cols-3 gap-2">
        <H2HColumn
          team={homeTeam}
          wins={h2h.homeWins}
          label="Victoires"
        />
        <H2HColumn
          wins={h2h.draws}
          label="Nuls"
          isNeutral
        />
        <H2HColumn
          team={awayTeam}
          wins={h2h.awayWins}
          label="Victoires"
        />
      </div>
    </div>
  );
}

interface H2HColumnProps {
  team?: Team;
  wins: number;
  label: string;
  isNeutral?: boolean;
}

function H2HColumn({ team, wins, label, isNeutral }: H2HColumnProps) {
  return (
    <div className="text-center p-3 bg-background rounded-lg">
      {team && (
        <div className="mb-2">
          <span className="text-xl">{team.logo}</span>
        </div>
      )}
      <p className={`text-2xl font-bold ${isNeutral ? 'text-yellow-500' : 'text-white'}`}>
        {wins}
      </p>
      <p className="text-xs text-gray-500">{label}</p>
    </div>
  );
}
