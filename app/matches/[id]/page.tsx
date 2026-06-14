'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { Match, MatchAnalysis, MatchStats } from '@/lib/types';
import { BottomNav } from '@/components/layout/BottomNav';
import { getMatchById, getMatchAnalysis, getMatchStats } from '@/lib/mock-data';
import { formatTime } from '@/lib/utils';

export default function MatchDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [match, setMatch] = useState<Match | null>(null);
  const [analysis, setAnalysis] = useState<MatchAnalysis | null>(null);
  const [stats, setStats] = useState<MatchStats | null>(null);
  const [activeTab, setActiveTab] = useState<'analyses' | 'stats'>('analyses');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const m = await getMatchById(params.id as string);
        if (!m) {
          router.push('/');
          return;
        }

        setMatch(m);

        const a = await getMatchAnalysis(m.id);
        setAnalysis(a);

        if (m.status === 'LIVE' || m.status === 'FINISHED') {
          const s = await getMatchStats(m.id);
          setStats(s);
        }
      } finally {
        setIsLoading(false);
      }
    }

    loadData();
  }, [params.id, router]);

  if (isLoading || !match) {
    return (
      <div className="bg-bg-page min-h-screen flex items-center justify-center">
        <p className="text-text-secondary">Chargement...</p>
        <BottomNav />
      </div>
    );
  }

  const canShowStats = match.status === 'LIVE' || match.status === 'FINISHED';

  return (
    <div className="bg-bg-page min-h-screen pb-20">
      {/* Header Compact */}
      <div className="sticky top-0 z-20 bg-bg-header border-b border-border-dark px-4 py-3">
        <div className="flex items-center justify-between mb-3">
          <button
            onClick={() => router.back()}
            className="p-2 hover:bg-bg-surface-hover rounded transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
          <div className="text-xs font-semibold text-accent-cta">
            {match.status === 'LIVE' && `${match.minute}'`}
            {match.status === 'FINISHED' && 'Terminé'}
            {match.status === 'UPCOMING' && formatTime(match.kickoffTime)}
          </div>
        </div>

        {/* Score Section */}
        <div className="flex items-center justify-between">
          <div className="flex-1 text-center">
            <img
              src={match.homeTeam.logoUrl}
              alt={match.homeTeam.name}
              className="w-8 h-8 mx-auto mb-1"
            />
            <p className="text-xs text-text-secondary">{match.homeTeam.shortName}</p>
          </div>

          <div className="flex-1 text-center px-2">
            {match.homeScore !== null && match.awayScore !== null ? (
              <p className="text-2xl font-bold text-accent-cta">
                {match.homeScore} - {match.awayScore}
              </p>
            ) : (
              <p className="text-sm text-text-secondary">vs</p>
            )}
          </div>

          <div className="flex-1 text-center">
            <img
              src={match.awayTeam.logoUrl}
              alt={match.awayTeam.name}
              className="w-8 h-8 mx-auto mb-1"
            />
            <p className="text-xs text-text-secondary">{match.awayTeam.shortName}</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="px-4 py-3 border-b border-border-dark flex gap-4">
        <button
          onClick={() => setActiveTab('analyses')}
          className={`pb-2 px-2 border-b-2 transition-colors ${
            activeTab === 'analyses'
              ? 'border-accent-cta text-accent-cta font-semibold'
              : 'border-transparent text-text-secondary'
          }`}
        >
          Analyses
        </button>
        {canShowStats && (
          <button
            onClick={() => setActiveTab('stats')}
            className={`pb-2 px-2 border-b-2 transition-colors ${
              activeTab === 'stats'
                ? 'border-accent-cta text-accent-cta font-semibold'
                : 'border-transparent text-text-secondary'
            }`}
          >
            Stats
          </button>
        )}
      </div>

      {/* Content */}
      <main className="px-4 py-4 space-y-4">
        {activeTab === 'analyses' && analysis && (
          <div className="space-y-4">
            {/* Insights */}
            <section>
              <h3 className="text-sm font-semibold text-text-primary mb-2">Analyses</h3>
              <div className="space-y-2">
                {analysis.insights.map((insight) => (
                  <div
                    key={insight.id}
                    className="bg-bg-surface border border-border-dark rounded-xl p-3"
                  >
                    <p className="text-sm font-semibold text-text-primary">
                      {insight.text}
                    </p>
                    <p className="text-xs text-text-secondary mt-1">{insight.basis}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Prediction */}
            <section className="bg-bg-surface border border-border-dark rounded-xl p-4">
              <p className="text-xs text-text-secondary mb-2">Score prédit</p>
              <p className="text-4xl font-bold text-accent-cta mb-2">
                {analysis.prediction.predictedScore}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-sm">{analysis.prediction.confidence}% confiance</span>
                <span className="text-xs text-text-secondary">
                  {analysis.prediction.methodNote}
                </span>
              </div>
            </section>

            {/* Form */}
            <section>
              <h3 className="text-sm font-semibold text-text-primary mb-2">Forme récente</h3>
              <div className="space-y-2">
                {[analysis.formHome, analysis.formAway].map((form) => (
                  <div key={form.teamId} className="flex gap-2">
                    <div className="flex-1 flex gap-1">
                      {form.results.map((result, i) => (
                        <div
                          key={i}
                          className={`flex-1 h-6 rounded text-xs font-bold flex items-center justify-center ${
                            result === 'W'
                              ? 'bg-accent-cta text-bg-page'
                              : result === 'D'
                              ? 'bg-text-secondary text-bg-page'
                              : 'bg-red-900 text-white'
                          }`}
                        >
                          {result}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* H2H */}
            <section className="bg-bg-surface border border-border-dark rounded-xl p-4">
              <h3 className="text-sm font-semibold text-text-primary mb-3">
                Historique
              </h3>
              <div className="grid grid-cols-3 gap-2 text-center">
                <div>
                  <p className="text-2xl font-bold text-accent-cta">
                    {analysis.h2h.teamAWins}
                  </p>
                  <p className="text-xs text-text-secondary">Victoires</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-accent-cta">
                    {analysis.h2h.draws}
                  </p>
                  <p className="text-xs text-text-secondary">Nuls</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-accent-cta">
                    {analysis.h2h.teamBWins}
                  </p>
                  <p className="text-xs text-text-secondary">Victoires</p>
                </div>
              </div>
            </section>
          </div>
        )}

        {activeTab === 'stats' && stats && (
          <div className="space-y-4">
            {/* Stats Bars */}
            <section className="bg-bg-surface border border-border-dark rounded-xl p-4 space-y-3">
              {stats.stats.map((stat, i) => {
                const total = stat.home + stat.away;
                const homePercent = total > 0 ? (stat.home / total) * 100 : 50;
                const awayPercent = total > 0 ? (stat.away / total) * 100 : 50;

                return (
                  <div key={i}>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="font-semibold">
                        {stat.home}
                        {stat.unit}
                      </span>
                      <span className="text-text-secondary">{stat.label}</span>
                      <span className="font-semibold">
                        {stat.away}
                        {stat.unit}
                      </span>
                    </div>
                    <div className="flex h-2 rounded-full overflow-hidden bg-border-dark">
                      <div
                        className="bg-accent-cta transition-all"
                        style={{ width: `${homePercent}%` }}
                      />
                      <div
                        className="bg-text-secondary transition-all"
                        style={{ width: `${awayPercent}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </section>

            {/* Cards */}
            <section className="bg-bg-surface border border-border-dark rounded-xl p-4">
              <p className="text-xs text-text-secondary mb-3">Cartons</p>
              <div className="flex justify-between">
                <div className="flex gap-1">
                  {Array(stats.cardsHome)
                    .fill(0)
                    .map((_, i) => (
                      <div key={i} className="w-4 h-6 bg-yellow-500 rounded" />
                    ))}
                </div>
                <div className="flex gap-1">
                  {Array(stats.cardsAway)
                    .fill(0)
                    .map((_, i) => (
                      <div key={i} className="w-4 h-6 bg-yellow-500 rounded" />
                    ))}
                </div>
              </div>
            </section>

            {/* Players */}
            {stats.playersToWatch.length > 0 && (
              <section>
                <h3 className="text-sm font-semibold text-text-primary mb-2">
                  Joueurs à suivre
                </h3>
                <div className="space-y-2">
                  {stats.playersToWatch.map((player) => (
                    <div
                      key={player.id}
                      className="bg-bg-surface border border-border-dark rounded-xl p-3 flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2">
                        <img
                          src={player.avatarUrl}
                          alt={player.name}
                          className="w-8 h-8 rounded-full"
                        />
                        <div>
                          <p className="text-xs font-semibold">{player.name}</p>
                          <p className="text-xs text-text-secondary">
                            {player.statLabel}
                          </p>
                        </div>
                      </div>
                      <p className="text-sm font-bold text-accent-cta">
                        {player.statValue}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        )}
      </main>

      <BottomNav />
    </div>
  );
}
