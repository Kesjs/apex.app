'use client';

import { Match } from '@/lib/types';
import { formatDate, formatTime } from '@/lib/utils';

interface MatchCardProps {
  match: Match;
  onClick?: () => void;
}

export function MatchCard({ match, onClick }: MatchCardProps) {
  const isLive = match.status === 'LIVE';
  const isFinished = match.status === 'FINISHED';

  return (
    <button
      onClick={onClick}
      className="w-full bg-card-bg border border-border-dark rounded-xl p-4 hover:border-accent/50 transition-all duration-150 text-left"
    >
      <div className="flex justify-between items-center mb-3">
        <span className="text-xs text-gray-400">{match.competition}</span>
        <StatusBadge status={match.status} />
      </div>

      <div className="flex justify-between items-center">
        {/* Home Team */}
        <div className="flex items-center gap-2 flex-1">
          <span className="text-2xl">{match.homeTeam.logo}</span>
          <span className="font-medium text-sm truncate">{match.homeTeam.name}</span>
        </div>

        {/* Score */}
        <div className="flex items-center gap-2 px-4">
          {isLive && (
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
          )}
          <span className={`text-xl font-bold ${isLive ? 'text-accent' : ''}`}>
            {isLive || isFinished ? `${match.score.home} - ${match.score.away}` : formatTime(match.startTime)}
          </span>
        </div>

        {/* Away Team */}
        <div className="flex items-center gap-2 flex-1 justify-end">
          <span className="font-medium text-sm truncate">{match.awayTeam.name}</span>
          <span className="text-2xl">{match.awayTeam.logo}</span>
        </div>
      </div>

      {isLive && match.timeline.length > 0 && (
        <div className="mt-3 pt-3 border-t border-border-dark">
          <div className="flex gap-2 text-xs text-gray-400">
            <span>{match.timeline[match.timeline.length - 1].description}</span>
            <span>•</span>
            <span className="text-accent font-medium">{match.timeline[match.timeline.length - 1].minute}'</span>
          </div>
        </div>
      )}

      {!isLive && !isFinished && (
        <div className="mt-3 pt-3 border-t border-border-dark text-xs text-gray-400">
          {formatDate(match.startTime)}
        </div>
      )}
    </button>
  );
}

function StatusBadge({ status }: { status: Match['status'] }) {
  if (status === 'LIVE') {
    return (
      <span className="px-2 py-1 bg-accent/20 text-accent text-xs font-medium rounded-full flex items-center gap-1">
        <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
        LIVE
      </span>
    );
  }
  if (status === 'FINISHED') {
    return (
      <span className="px-2 py-1 bg-gray-800 text-gray-400 text-xs font-medium rounded-full">
        TERMINÉ
      </span>
    );
  }
  return null;
}
