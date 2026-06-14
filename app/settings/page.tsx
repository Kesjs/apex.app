'use client';

import { BottomNav } from '@/components/layout/BottomNav';
import { Bell } from 'lucide-react';

export default function SettingsPage() {
  return (
    <div className="bg-bg-page min-h-screen pb-20">
      <div className="px-4 pt-6">
        <h1 className="text-2xl font-bold mb-6">Paramètres</h1>

        {/* Notifications */}
        <section className="bg-bg-surface border border-border-dark rounded-xl p-4 mb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Bell size={20} className="text-accent-cta" />
              <div>
                <p className="font-semibold text-text-primary">Notifications</p>
                <p className="text-xs text-text-secondary">Buts, débuts de match</p>
              </div>
            </div>
            <input
              type="checkbox"
              defaultChecked
              className="w-5 h-5 accent-accent-cta"
            />
          </div>
        </section>

        {/* Legal */}
        <section className="px-4 py-4 text-center">
          <p className="text-xs text-text-secondary mb-2">
            18+ Jeu responsable
          </p>
          <p className="text-xs text-text-secondary">
            Apex n'est pas affilié aux paris sportifs
          </p>
        </section>
      </div>

      <BottomNav />
    </div>
  );
}
