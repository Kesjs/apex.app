'use client';

import { Insight } from '@/lib/types';
import { PromoCard } from './PromoCard';
import { cn } from '@/lib/utils';

interface AnimatedInsightProps {
  insight: Insight;
  index: number;
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

export function AnimatedInsight({ insight, index }: AnimatedInsightProps) {
  return (
    <div
      className={cn(
        'fade-scale-enter',
        index === 0 && 'fade-scale-delay-1',
        index === 1 && 'fade-scale-delay-2',
        index === 2 && 'fade-scale-delay-3',
      )}
    >
      <InsightCard insight={insight} />
      {index === 0 && <PromoCard section="insights" />}
    </div>
  );
}

export function AnimatedInsightsSection({ insights }: { insights: Insight[] }) {
  return (
    <div className="space-y-3">
      {insights.map((insight, index) => (
        <AnimatedInsight key={index} insight={insight} index={index} />
      ))}
    </div>
  );
}
