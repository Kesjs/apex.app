'use client';

import { FormData } from '@/lib/types';

interface FormSectionProps {
  formData: [FormData, FormData];
}

export function FormSection({ formData }: FormSectionProps) {
  return (
    <div className="bg-card-bg border border-border-dark rounded-xl p-4">
      <h3 className="text-sm font-medium text-gray-400 mb-4">Forme Récente</h3>
      <div className="space-y-3">
        {formData.map((team, index) => (
          <FormRow key={index} team={team} />
        ))}
      </div>
    </div>
  );
}

function FormRow({ team }: { team: FormData }) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-2 w-24">
        <span className="text-lg">{team.team.logo}</span>
        <span className="text-sm font-medium text-gray-300">{team.team.code}</span>
      </div>
      <div className="flex gap-1 flex-1">
        {team.last5.map((result, index) => (
          <ResultBar key={index} result={result} />
        ))}
      </div>
    </div>
  );
}

function ResultBar({ result }: { result: 'W' | 'D' | 'L' }) {
  const colors = {
    W: 'bg-accent',
    D: 'bg-yellow-500',
    L: 'bg-red-500',
  };

  const labels = {
    W: 'V',
    D: 'N',
    L: 'D',
  };

  return (
    <div
      className={`flex-1 h-8 rounded ${colors[result]} flex items-center justify-center text-xs font-bold text-black`}
    >
      {labels[result]}
    </div>
  );
}
