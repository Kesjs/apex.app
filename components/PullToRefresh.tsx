'use client';

import { useState, useRef, ReactNode } from 'react';
import { RefreshCw } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PullToRefreshProps {
  children: ReactNode;
  onRefresh: () => Promise<void>;
  disabled?: boolean;
}

export function PullToRefresh({ children, onRefresh, disabled = false }: PullToRefreshProps) {
  const [isPulling, setIsPulling] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [pullDistance, setPullDistance] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const startY = useRef(0);

  const threshold = 80;

  const handleTouchStart = (e: React.TouchEvent) => {
    if (disabled || isRefreshing) return;
    
    const scrollTop = containerRef.current?.scrollTop ?? 0;
    if (scrollTop === 0) {
      startY.current = e.targetTouches[0].clientY;
      setIsPulling(true);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isPulling || disabled || isRefreshing) return;

    const currentY = e.targetTouches[0].clientY;
    const distance = currentY - startY.current;

    if (distance > 0 && distance < threshold * 2) {
      setPullDistance(distance);
    }
  };

  const handleTouchEnd = async () => {
    if (!isPulling || disabled || isRefreshing) return;

    setIsPulling(false);

    if (pullDistance >= threshold) {
      setIsRefreshing(true);
      setPullDistance(threshold);
      
      try {
        await onRefresh();
      } finally {
        setIsRefreshing(false);
        setPullDistance(0);
      }
    } else {
      setPullDistance(0);
    }
  };

  const indicatorTop = Math.min(pullDistance - 50, 0);

  return (
    <div className="pull-to-refresh relative overflow-hidden h-full">
      {/* Pull indicator */}
      <div
        className="pull-indicator"
        style={{
          top: `${indicatorTop}px`,
          opacity: pullDistance / threshold,
        }}
      >
        <RefreshCw
          className={cn(
            'w-5 h-5 text-accent',
            (isPulling || isRefreshing) && 'pulling'
          )}
        />
      </div>

      {/* Content */}
      <div
        ref={containerRef}
        className="h-full overflow-y-auto"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{
          transform: `translateY(${pullDistance * 0.5}px)`,
          transition: isPulling ? 'none' : 'transform 0.3s ease',
        }}
      >
        {children}
      </div>
    </div>
  );
}

export function useRefresh() {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const refresh = async (callback: () => Promise<void>) => {
    setIsRefreshing(true);
    try {
      await callback();
    } finally {
      setIsRefreshing(false);
    }
  };

  return { isRefreshing, refresh };
}
