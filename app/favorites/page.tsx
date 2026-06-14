'use client';

import { BottomNav } from '@/components/layout/BottomNav';

export default function FavoritesPage() {
  return (
    <div className="bg-bg-page min-h-screen">
      <div className="px-4 pt-20 text-center">
        <p className="text-text-secondary">Favoris - à venir</p>
      </div>
      <BottomNav />
    </div>
  );
}
