'use client';

import { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';
import { isInWatchlist, addToWatchlist, removeFromWatchlist } from '@/lib/watchlist';
import { cn } from '@/lib/utils';

interface WatchlistButtonProps {
  matchId: string;
  homeTeam: string;
  awayTeam: string;
  competition: string;
}

export function WatchlistButton({
  matchId,
  homeTeam,
  awayTeam,
  competition,
}: WatchlistButtonProps) {
  const [isWatched, setIsWatched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsWatched(isInWatchlist(matchId));
  }, [matchId]);

  const handleToggle = async () => {
    setIsLoading(true);

    if (isWatched) {
      removeFromWatchlist(matchId);
      setIsWatched(false);
    } else {
      const success = addToWatchlist(matchId, homeTeam, awayTeam, competition);
      if (success) {
        setIsWatched(true);
      }
    }

    setIsLoading(false);
  };

  return (
    <button
      onClick={handleToggle}
      disabled={isLoading}
      className={cn(
        'flex items-center gap-2 px-3 py-2 rounded-lg transition-all',
        isWatched
          ? 'bg-accent/20 border border-accent text-accent'
          : 'bg-card-bg border border-border-dark text-gray-400 hover:border-accent/50'
      )}
      aria-label={isWatched ? 'Retirer de la watchlist' : 'Ajouter à la watchlist'}
    >
      <Heart
        className={cn('w-5 h-5', isWatched && 'fill-current')}
        strokeWidth={isWatched ? 0 : 1.5}
      />
      <span className="text-sm font-medium">
        {isWatched ? 'Watchlist' : 'Ajouter'}
      </span>
    </button>
  );
}
