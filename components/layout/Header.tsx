'use client';

import { useState } from 'react';
import { Star } from 'lucide-react';
import { Competition } from '@/lib/types';

interface HeaderProps {
  competitions: Competition[];
  activeCompetitionId?: string;
  onCompetitionChange?: (id: string) => void;
}

export function Header({
  competitions,
  activeCompetitionId,
  onCompetitionChange,
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 bg-bg-header border-b border-border-dark">
      {/* Level 1: Logo + Star */}
      <div className="px-4 py-4 flex items-center justify-between">
        <div className="text-2xl font-bold tracking-tight">APEX</div>
        <button className="p-2 hover:bg-bg-surface-hover rounded-full transition-colors">
          <Star size={20} className="text-accent-cta" />
        </button>
      </div>

      {/* Level 2: Competitions (scrollable chips) */}
      <div className="px-4 pb-3 overflow-x-auto flex gap-2 -mx-4 px-4 scrollbar-hide">
        {competitions.map((comp) => (
          <button
            key={comp.id}
            onClick={() => onCompetitionChange?.(comp.id)}
            className={`flex-shrink-0 px-4 py-2 rounded-full border transition-all whitespace-nowrap ${
              activeCompetitionId === comp.id
                ? 'bg-accent-active border-accent-active text-bg-page font-semibold'
                : 'bg-transparent border-border-dark text-text-secondary hover:border-accent-active'
            }`}
          >
            {comp.name}
          </button>
        ))}
      </div>

      {/* Level 3: Filter Tabs (sticky) */}
      <div className="sticky top-[calc(var(--header-height,60px))] bg-bg-header border-t border-border-dark px-4 py-3 flex gap-2">
        <button className="px-4 py-1.5 rounded-full bg-accent-active text-bg-page text-sm font-semibold">
          En direct
        </button>
        <button className="px-4 py-1.5 rounded-full border border-border-dark text-text-secondary text-sm hover:border-accent-active transition-colors">
          À venir
        </button>
        <button className="px-4 py-1.5 rounded-full border border-border-dark text-text-secondary text-sm hover:border-accent-active transition-colors">
          Résultats
        </button>
      </div>
    </header>
  );
}
