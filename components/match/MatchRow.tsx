'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Match } from '@/lib/types';
import { formatTime, formatRelativeTime } from '@/lib/utils';

interface MatchRowProps {
  match: Match;
}

export function MatchRow({ match }: MatchRowProps) {
  const isLive = match.status === 'LIVE';
  const isFinished = match.status === 'FINISHED';

  return (
    <Link href={`/matches/${match.id}`}>
      <div className="bg-bg-surface border border-border-dark rounded-md p-3 hover:bg-bg-surface-hover transition-colors cursor-pointer">
        <div className="flex items-center justify-between">
          {/* Status / Time */}
          <div className="text-xs font-semibold">
            {isLive && (
              <span className="inline-flex items-center gap-1 text-accent-cta">
                <span className="w-1.5 h-1.5 bg-accent-cta rounded-full animate-pulse-live" />
                {match.minute}'
              </span>
            )}
            {!isLive && !isFinished && (
              <span className="text-text-secondary">{formatTime(match.kickoffTime)}</span>
            )}
            {isFinished && (
              <span className="text-text-secondary">FT</span>
            )}
          </div>

          {/* Teams & Score */}
          <div className="flex-1 mx-3 flex items-center justify-center gap-2">
            {/* Home Team */}
            <div className="flex items-center gap-1.5 flex-1 justify-end">
              <span className="text-xs font-medium text-right truncate">
                {match.homeTeam.shortName}
              </span>
              <img
                src={match.homeTeam.logoUrl}
                alt={match.homeTeam.name}
                className="w-6 h-6"
              />
            </div>

            {/* Score */}
            <div className="text-center">
              {isLive || isFinished ? (
                <div className="flex flex-col items-center">
                  <span className="text-sm font-bold text-accent-cta">
                    {match.homeScore} - {match.awayScore}
                  </span>
                </div>
              ) : (
                <span className="text-xs text-text-secondary">vs</span>
              )}
            </div>

            {/* Away Team */}
            <div className="flex items-center gap-1.5 flex-1">
              <img
                src={match.awayTeam.logoUrl}
                alt={match.awayTeam.name}
                className="w-6 h-6"
              />
              <span className="text-xs font-medium truncate">
                {match.awayTeam.shortName}
              </span>
            </div>
          </div>

          {/* CTA Arrow */}
          <div className="text-text-secondary text-sm">→</div>
        </div>
      </div>
    </Link>
  );
}
