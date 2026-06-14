'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { getMatchById, getPreMatchAnalysis, getMatchStats } from '@/lib/mock-data';
import { Match } from '@/lib/types';
import { MatchCardSkeleton } from '@/components/Skeleton';
import { AnimatedInsightsSection } from '@/components/AnimatedInsight';
import { PoissonPrediction } from '@/components/PoissonPrediction';
import { FormSection } from '@/components/FormSection';
import { H2HSection } from '@/components/H2HSection';
import { AnimatedStatsSection } from '@/components/AnimatedStats';
import { AnimatedMatchHeader } from '@/components/AnimatedHeader';
import { WatchlistButton } from '@/components/WatchlistButton';
import { ShareAnalysisButton } from '@/components/ShareAnalysisButton';

type Tab = 'analyses' | 'stats';

export default function MatchDetailPage() {
  const params = useParams();
  const [match, setMatch] = useState<Match | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<Tab>('analyses');

  useEffect(() => {
    setTimeout(() => {
      const matchData = getMatchById(params.id as string);
      setMatch(matchData || null);
      setIsLoading(false);
    }, 500);
  }, [params.id]);

  if (isLoading) {
    return (
      <div className="py-6 space-y-4">
        <div className="flex items-center gap-3 mb-4">
          <MatchCardSkeleton />
        </div>
      </div>
    );
  }

  if (!match) {
    return (
      <div className="py-6 text-center text-gray-400">
        Match non trouvé
      </div>
    );
  }

  const showStats = match.status === 'LIVE' || match.status === 'FINISHED';
  const preMatchAnalysis = getPreMatchAnalysis(match.id);
  const matchStats = getMatchStats(match.id);

  return (
    <div className="py-6 space-y-4">
      {/* Animated Header */}
      <AnimatedMatchHeader match={match} />

      {/* Tabs + Actions */}
      <div className="flex gap-2 fade-scale-enter fade-scale-delay-1">
        <button
          onClick={() => setActiveTab('analyses')}
          className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
            activeTab === 'analyses'
              ? 'bg-accent text-black'
              : 'bg-card-bg text-gray-400'
          }`}
        >
          Analyses
        </button>
        {showStats && (
          <button
            onClick={() => setActiveTab('stats')}
            className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
              activeTab === 'stats'
                ? 'bg-accent text-black'
                : 'bg-card-bg text-gray-400'
            }`}
          >
            Stats Match
          </button>
        )}
      </div>

      {/* Quick Actions */}
      <div className="flex gap-2 fade-scale-enter fade-scale-delay-2">
        <WatchlistButton
          matchId={match.id}
          homeTeam={match.homeTeam.name}
          awayTeam={match.awayTeam.name}
          competition={match.competition}
        />
        {activeTab === 'analyses' && (
          <ShareAnalysisButton
            homeTeam={match.homeTeam.name}
            awayTeam={match.awayTeam.name}
            prediction={preMatchAnalysis.poissonPrediction}
            competition={match.competition}
          />
        )}
      </div>

      {/* Tab Content */}
      {activeTab === 'analyses' && (
        <div className="space-y-4 content-slide-container">
          <AnimatedInsightsSection insights={preMatchAnalysis.insights} />
          <div className="fade-scale-enter fade-scale-delay-2">
            <PoissonPrediction prediction={preMatchAnalysis.poissonPrediction} />
          </div>
          <div className="fade-scale-enter fade-scale-delay-3">
            <FormSection formData={preMatchAnalysis.formData} />
          </div>
          <div className="fade-scale-enter fade-scale-delay-4">
            <H2HSection
              h2h={preMatchAnalysis.h2h}
              homeTeam={match.homeTeam}
              awayTeam={match.awayTeam}
            />
          </div>
        </div>
      )}

      {activeTab === 'stats' && showStats && (
        <div className="content-slide-container">
          <AnimatedStatsSection stats={matchStats} />
        </div>
      )}
    </div>
  );
}
