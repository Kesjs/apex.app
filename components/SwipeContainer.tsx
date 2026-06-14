'use client';

import { ReactNode, useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface SwipeContainerProps {
  children: ReactNode[];
  activeIndex?: number;
  onChange?: (index: number) => void;
  showIndicator?: boolean;
}

export function SwipeContainer({
  children,
  activeIndex: controlledIndex,
  onChange,
  showIndicator = true,
}: SwipeContainerProps) {
  const [internalIndex, setInternalIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const currentIndex = controlledIndex ?? internalIndex;
  const count = children.length;

  const handleSwipe = (direction: 'left' | 'right') => {
    let newIndex = currentIndex;
    
    if (direction === 'left' && currentIndex < count - 1) {
      newIndex = currentIndex + 1;
    } else if (direction === 'right' && currentIndex > 0) {
      newIndex = currentIndex - 1;
    }

    if (onChange) {
      onChange(newIndex);
    } else {
      setInternalIndex(newIndex);
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 75) {
      handleSwipe('left');
    }
    if (touchStart - touchEnd < -75) {
      handleSwipe('right');
    }
  };

  return (
    <div className="swipe-container">
      <div
        ref={containerRef}
        className="swipe-content"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {children.map((child, index) => (
          <div key={index} className="swipe-item">
            {child}
          </div>
        ))}
      </div>

      {showIndicator && count > 1 && (
        <div className="flex justify-center gap-2 mt-4">
          {children.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                if (onChange) {
                  onChange(index);
                } else {
                  setInternalIndex(index);
                }
              }}
              className={cn(
                'w-2 h-2 rounded-full transition-all',
                index === currentIndex
                  ? 'bg-accent w-6'
                  : 'bg-border-dark hover:bg-gray-600'
              )}
              aria-label={`Aller à la slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export function SwipeableTabs({
  tabs,
  activeTab,
  onChange,
}: {
  tabs: { id: string; label: string; content: ReactNode }[];
  activeTab: string;
  onChange: (tabId: string) => void;
}) {
  const activeIndex = tabs.findIndex(t => t.id === activeTab);

  return (
    <div>
      {/* Tab headers */}
      <div className="flex gap-1 mb-4 bg-card-bg rounded-lg p-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={cn(
              'flex-1 py-2 px-3 rounded-md text-sm font-medium transition-all',
              tab.id === activeTab
                ? 'bg-accent text-black'
                : 'text-gray-400 hover:text-white'
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Swipeable content */}
      <SwipeContainer
        activeIndex={activeIndex}
        onChange={(index) => onChange(tabs[index].id)}
        showIndicator={false}
      >
        {tabs.map((tab) => (
          <div key={tab.id}>{tab.content}</div>
        ))}
      </SwipeContainer>
    </div>
  );
}
