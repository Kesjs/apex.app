'use client';

import { Trophy } from 'lucide-react';

export default function CompetitionsPage() {
  return (
    <div className="py-6">
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <Trophy className="w-16 h-16 text-gray-600 mb-4" />
        <h2 className="text-xl font-semibold text-gray-400 mb-2">Compétitions</h2>
        <p className="text-sm text-gray-500">
          Liste des compétitions disponible prochainement
        </p>
      </div>
    </div>
  );
}
