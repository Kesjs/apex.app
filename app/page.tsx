'use client';

import { useState, useEffect } from 'react';
import { Header } from '@/components/layout/Header';
import { BottomNav } from '@/components/layout/BottomNav';
import { MatchRow } from '@/components/match/MatchRow';
import { Competition, Match, FilterTab } from '@/lib/types';
import { getCompetitions, getMatches } from '@/lib/mock-data';
import { getDateLabel } from '@/lib/utils';

export default function HomePage() {
  const [competitions, setCompetitions] = useState<Competition[]>([]);
  const [matches, setMatches] = useState<Match[]>([]);
  const [activeCompetitionId, setActiveCompetitionId] = useState<string>('');
  const [activeFilter, setActiveFilter] = useState<FilterTab>('LIVE');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const comps = await getCompetitions();
        setCompetitions(comps);
        setActiveCompetitionId(comps.find((c) => c.isFeatured)?.id || comps[0]?.id || '');

        const allMatches = await getMatches({ status: 'LIVE' });
        setMatches(allMatches);
      } finally {
        setIsLoading(false);
      }
    }

    loadData();
  }, []);

  const handleFilterChange = async (filter: FilterTab) => {
    setActiveFilter(filter);
    setIsLoading(true);
    const result = await getMatches({ status: filter });
    setMatches(result);
    setIsLoading(false);
  };

  // Group matches by competition and date
  const groupedMatches = matches.reduce(
    (acc, match) => {
      const comp = competitions.find((c) => c.id === match.competitionId);
      if (!comp) return acc;

      const key = match.competitionId;
      if (!acc[key]) {
        acc[key] = { competition: comp, matches: [] };
      }
      acc[key].matches.push(match);
      return acc;
    },
    {} as Record<string, { competition: Competition; matches: Match[] }>
  );

  return (
    <div className="bg-bg-page min-h-screen">
      <Header
        competitions={competitions}
        activeCompetitionId={activeCompetitionId}
        onCompetitionChange={setActiveCompetitionId}
      />

      <main className="px-4 pt-4 space-y-6">
        {isLoading ? (
          <div className="space-y-2">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="h-16 bg-bg-surface rounded-md skeleton"
              />
            ))}
          </div>
        ) : matches.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-text-secondary">Aucun match trouvé</p>
          </div>
        ) : (
          Object.entries(groupedMatches).map(([compId, { competition, matches: compMatches }]) => (
            <section key={compId}>
              <div className="flex items-center gap-2 mb-3">
                <img
                  src={competition.iconUrl}
                  alt={competition.name}
                  className="w-5 h-5"
                />
                <h2 className="text-sm font-semibold text-text-primary">
                  {competition.name}
                </h2>
              </div>

              <div className="space-y-2">
                {compMatches.map((match) => (
                  <MatchRow key={match.id} match={match} />
                ))}
              </div>
            </section>
          ))
        )}
      </main>

      <BottomNav />
    </div>
  );
}
