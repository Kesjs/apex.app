'use client';

import { Heart } from 'lucide-react';

export default function FavoritesPage() {
  return (
    <div className="py-6">
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <Heart className="w-16 h-16 text-gray-600 mb-4" />
        <h2 className="text-xl font-semibold text-gray-400 mb-2">Favoris</h2>
        <p className="text-sm text-gray-500">
          Ajoutez des matchs à vos favoris pour les suivre facilement
        </p>
      </div>
    </div>
  );
}
