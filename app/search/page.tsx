'use client';

import { useState } from 'react';
import { Search as SearchIcon, X } from 'lucide-react';

export default function SearchPage() {
  const [query, setQuery] = useState('');

  return (
    <div className="py-6">
      {/* Search Input */}
      <div className="relative mb-6">
        <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Rechercher un match, équipe..."
          className="w-full bg-card-bg border border-border-dark rounded-xl py-3 pl-10 pr-10 text-white placeholder-gray-500 focus:outline-none focus:border-accent"
        />
        {query && (
          <button
            onClick={() => setQuery('')}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Results */}
      <div className="flex flex-col items-center justify-center min-h-[50vh] text-center">
        <SearchIcon className="w-16 h-16 text-gray-600 mb-4" />
        <h2 className="text-xl font-semibold text-gray-400 mb-2">Recherche</h2>
        <p className="text-sm text-gray-500">
          Tapez pour rechercher des matchs ou équipes
        </p>
      </div>
    </div>
  );
}
