'use client';

import { PoissonPrediction as PoissonPredictionType } from '@/lib/types';
import { TrendingUp } from 'lucide-react';

interface PoissonPredictionProps {
  prediction: PoissonPredictionType;
}

export function PoissonPrediction({ prediction }: PoissonPredictionProps) {
  const predictedScore = `${prediction.homeGoals.toFixed(0)} - ${prediction.awayGoals.toFixed(0)}`;

  return (
    <div className="bg-card-bg border border-border-dark rounded-xl p-4">
      <div className="flex items-center gap-2 mb-4">
        <TrendingUp className="w-5 h-5 text-accent" />
        <span className="text-sm font-medium text-gray-400">Tendance Modèle</span>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <p className="text-3xl font-bold text-white">{predictedScore}</p>
          <p className="text-xs text-gray-500 mt-1">Score probable</p>
        </div>

        <div className="text-right">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-accent">{prediction.confidence}%</span>
          </div>
          <p className="text-xs text-gray-500 mt-1">Confiance</p>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-border-dark">
        <p className="text-xs text-gray-500">{prediction.methodology}</p>
      </div>
    </div>
  );
}
