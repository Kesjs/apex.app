'use client';

import { Insight } from '@/lib/types';
import { PromoCard } from './PromoCard';

interface InsightsSectionProps {
  insights: Insight[];
}

export function InsightsSection({ insights }: InsightsSectionProps) {
  return (
    <div className="space-y-3">
      {insights.map((insight, index) => (
        <div key={index}>
          <InsightCard insight={insight} />
          {index === 0 && <PromoCard section="insights" />}
        </div>
      ))}
    </div>
  );
}

function InsightCard({ insight }: { insight: Insight }) {
  return (
    <div className="bg-card-bg border border-border-dark rounded-xl p-4">
      <div className="flex items-start gap-3">
        <span className="text-2xl">{insight.icon}</span>
        <div className="flex-1">
          <h3 className="font-medium text-white mb-1">{insight.title}</h3>
          <p className="text-sm text-gray-300 mb-2">{insight.description}</p>
          <p className="text-xs text-gray-500">{insight.calculation}</p>
        </div>
      </div>
    </div>
  );
}
