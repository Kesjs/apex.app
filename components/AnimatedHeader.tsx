'use client';

import { Match } from '@/lib/types';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export function AnimatedMatchHeader({ match }: { match: Match }) {
  return (
    <div className="header-enter">
      <div className="flex items-center gap-3 mb-4">
        <Link href="/" className="text-gray-400 hover:text-white transition-colors">
          <ArrowLeft className="w-6 h-6" />
        </Link>
        <div>
          <p className="text-sm text-gray-400 title-slide-in">{match.competition}</p>
          <p className="font-medium title-slide-in" style={{ animationDelay: '0.1s' }}>
            {match.homeTeam.name} vs {match.awayTeam.name}
          </p>
        </div>
      </div>

      {/* Match Summary */}
      <div className="bg-card-bg border border-border-dark rounded-xl p-4 fade-scale-enter">
        <div className="flex justify-between items-center">
          <div className="text-center flex-1">
            <p className="text-3xl mb-1">{match.homeTeam.logo}</p>
            <p className="text-sm font-medium">{match.homeTeam.code}</p>
          </div>
          <div className="text-center px-4">
            {match.status === 'LIVE' || match.status === 'FINISHED' ? (
              <div className="number-pop">
                <p className="text-3xl font-bold">
                  {match.score.home} - {match.score.away}
                </p>
                {match.status === 'LIVE' && (
                  <p className="text-accent text-sm font-medium">LIVE</p>
                )}
              </div>
            ) : (
              <p className="text-xl font-bold">VS</p>
            )}
          </div>
          <div className="text-center flex-1">
            <p className="text-3xl mb-1">{match.awayTeam.logo}</p>
            <p className="text-sm font-medium">{match.awayTeam.code}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function AnimatedSectionTitle({ title }: { title: string }) {
  return (
    <h2 className="text-lg font-semibold mb-3 title-slide-in">
      {title}
    </h2>
  );
}
