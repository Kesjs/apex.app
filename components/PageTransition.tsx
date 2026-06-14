'use client';

import { ReactNode, useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

interface PageTransitionProps {
  children: ReactNode;
  type?: 'fade' | 'slide' | 'slideUp';
}

export function PageTransition({ children, type = 'fade' }: PageTransitionProps) {
  const pathname = usePathname();
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    setIsAnimating(true);
    const timer = setTimeout(() => setIsAnimating(false), 300);
    return () => clearTimeout(timer);
  }, [pathname]);

  const animationClass = {
    fade: 'page-enter',
    slide: 'page-enter-slide',
    slideUp: 'page-enter-up',
  };

  return (
    <div className={cn(isAnimating && animationClass[type])}>
      {children}
    </div>
  );
}

export function CardEntrance({ 
  children, 
  delay = 0 
}: { 
  children: ReactNode;
  delay?: 0 | 1 | 2 | 3;
}) {
  return (
    <div className={cn(
      'card-enter',
      delay > 0 && `card-enter-delay-${delay}`
    )}>
      {children}
    </div>
  );
}
