'use client';

import { useState } from 'react';
import { Copy, Check, ExternalLink } from 'lucide-react';
import { generateUTM, copyToClipboard } from '@/lib/utils';

interface PromoCardProps {
  section: string;
  title?: string;
  description?: string;
}

export function PromoCard({
  section,
  title = 'Obtenez 100% bonus',
  description = 'Inscription KENKEN - Cotes exclusives',
}: PromoCardProps) {
  const [copied, setCopied] = useState(false);

  const promoUrl = `https://kenken.bet${generateUTM(section)}`;

  const handleCopy = async () => {
    await copyToClipboard(promoUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-gradient-to-r from-card-bg to-accent/10 border border-accent/30 rounded-xl p-4 mt-4">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-accent font-semibold text-sm">{title}</span>
            <ExternalLink className="w-3 h-3 text-accent" />
          </div>
          <p className="text-xs text-gray-400">{description}</p>
        </div>

        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-accent/20 text-accent rounded-lg hover:bg-accent/30 transition-colors text-sm font-medium"
          aria-label="Copier le lien promotionnel"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4" />
              <span>Copié</span>
            </>
          ) : (
            <>
              <Copy className="w-4 h-4" />
              <span>Obtenir</span>
            </>
          )}
        </button>
      </div>

      <div className="mt-2 pt-2 border-t border-border-dark">
        <p className="text-xs text-gray-500 text-center">18+ Jeu responsable</p>
      </div>
    </div>
  );
}
