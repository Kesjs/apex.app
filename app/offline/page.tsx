'use client';

import { Wifi } from 'lucide-react';

export default function OfflinePage() {
  return (
    <div className="bg-bg-page min-h-screen flex items-center justify-center px-4">
      <div className="text-center">
        <Wifi size={48} className="text-text-secondary mx-auto mb-4 opacity-50" />
        <h1 className="text-xl font-bold text-text-primary mb-2">Pas de connexion</h1>
        <p className="text-text-secondary text-sm">
          Affichage des dernières données disponibles hors ligne
        </p>
      </div>
    </div>
  );
}
