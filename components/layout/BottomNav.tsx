'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Compass, Heart, Search } from 'lucide-react';

const navItems = [
  { href: '/', icon: Home, label: 'Accueil' },
  { href: '/competitions', icon: Compass, label: 'Compétitions' },
  { href: '/favorites', icon: Heart, label: 'Favoris' },
  { href: '/search', icon: Search, label: 'Recherche' },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-bg-header border-t border-border-dark">
      <div className="max-w-[480px] mx-auto px-4 flex items-center justify-around h-20">
        {navItems.map(({ href, icon: Icon, label }) => {
          const isActive = pathname === href || pathname.startsWith(`${href}/`);
          return (
            <Link
              key={href}
              href={href}
              className="flex flex-col items-center gap-1 py-2"
            >
              <Icon
                size={24}
                className={
                  isActive ? 'text-accent-cta' : 'text-text-secondary'
                }
              />
              <span
                className={`text-xs font-medium ${
                  isActive
                    ? 'text-accent-cta'
                    : 'text-text-secondary'
                }`}
              >
                {label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
