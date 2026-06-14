'use client';

import { useState, useEffect } from 'react';
import { AnimatedMatchList } from '@/components/AnimatedMatch';
import { MatchCardSkeleton } from '@/components/Skeleton';
import { mockMatches, getLiveMatches, getUpcomingMatches, getFinishedMatches } from '@/lib/mock-data';
import { Match } from '@/lib/types';

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(true);
  const [matches, setMatches] = useState<Match[]>([]);

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setMatches(mockMatches);
      setIsLoading(false);
    }, 800);
  }, []);

  const liveMatches = getLiveMatches();
  const upcomingMatches = getUpcomingMatches();
  const finishedMatches = getFinishedMatches();

  return (
    <div className="py-6 space-y-6">
      {/* Live Matches */}
      {liveMatches.length > 0 && (
        <section>
          <h2 className="text-lg font-semibold mb-3 flex items-center gap-2 title-slide-in">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            En direct
          </h2>
          <div className="space-y-3">
            {isLoading
              ? <MatchCardSkeleton />
              : (
                <AnimatedMatchList matches={liveMatches} />
              )
            }
          </div>
        </section>
      )}

      {/* Upcoming Matches */}
      <section>
        <h2 className="text-lg font-semibold mb-3 title-slide-in" style={{ animationDelay: '0.1s' }}>
          À venir
        </h2>
        <div className="space-y-3">
          {isLoading ? (
            <>
              <MatchCardSkeleton />
              <MatchCardSkeleton />
            </>
          ) : (
            <AnimatedMatchList matches={upcomingMatches} />
          )}
        </div>
      </section>

      {/* Finished Matches */}
      <section>
        <h2 className="text-lg font-semibold mb-3 title-slide-in" style={{ animationDelay: '0.2s' }}>
          Résultats
        </h2>
        <div className="space-y-3">
          {isLoading ? (
            <>
              <MatchCardSkeleton />
              <MatchCardSkeleton />
            </>
          ) : (
            <AnimatedMatchList matches={finishedMatches} />
          )}
        </div>
      </section>
    </div>
  );
}
