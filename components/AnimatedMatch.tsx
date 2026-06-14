'use client';

import { Match } from '@/lib/types';
import { MatchCard } from './MatchCard';
import { cn } from '@/lib/utils';

interface AnimatedMatchProps {
  match: Match;
  index: number;
  onClick?: () => void;
}

export function AnimatedMatch({ match, index, onClick }: AnimatedMatchProps) {
  return (
    <div
      className={cn(
        'stagger-item',
        'transition-all duration-300'
      )}
      style={{
        animationDelay: `${index * 60}ms`,
      }}
    >
      <MatchCard match={match} onClick={onClick} />
    </div>
  );
}

export function AnimatedMatchList({ 
  matches, 
  onMatchClick 
}: { 
  matches: Match[];
  onMatchClick?: (id: string) => void;
}) {
  return (
    <div className="stagger-container space-y-3">
      {matches.map((match, index) => (
        <AnimatedMatch
          key={match.id}
          match={match}
          index={index}
          onClick={() => onMatchClick?.(match.id)}
        />
      ))}
    </div>
  );
}
