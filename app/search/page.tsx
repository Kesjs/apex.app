'use client';

import { BottomNav } from '@/components/layout/BottomNav';

export default function SearchPage() {
  return (
    <div className="bg-bg-page min-h-screen">
      <div className="px-4 pt-20 text-center">
        <p className="text-text-secondary">Recherche - à venir</p>
      </div>
      <BottomNav />
    </div>
  );
}
