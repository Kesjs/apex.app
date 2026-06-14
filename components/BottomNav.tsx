'use client';

import { Home, Trophy, Heart, Search } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function BottomNav() {
  const pathname = usePathname();

  const navItems = [
    { icon: Home, label: 'Home', href: '/' },
    { icon: Trophy, label: 'Compétitions', href: '/competitions' },
    { icon: Heart, label: 'Favoris', href: '/favorites' },
    { icon: Search, label: 'Recherche', href: '/search' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card-bg border-t border-border-dark safe-area-bottom z-50">
      <div className="flex justify-around items-center h-16">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center gap-1 px-4 py-2 transition-colors ${
                isActive ? 'text-accent' : 'text-gray-400 hover:text-white'
              }`}
            >
              <Icon className="w-5 h-5" strokeWidth={1.5} />
              <span className="text-xs">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
