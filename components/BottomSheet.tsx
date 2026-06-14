'use client';

import { ReactNode, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
}

export function BottomSheet({ isOpen, onClose, title, children }: BottomSheetProps) {
  const [isClosing, setIsClosing] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      onClose();
    }, 200);
  };

  if (!mounted || !isOpen) return null;

  return createPortal(
    <>
      {/* Backdrop */}
      <div
        className={cn(
          'bottom-sheet-backdrop',
          !isClosing && 'open',
          isClosing && 'closing'
        )}
        onClick={handleClose}
      />

      {/* Sheet */}
      <div
        className={cn(
          'bottom-sheet',
          !isClosing && 'open',
          isClosing && 'closing'
        )}
      >
        <div className="bottom-sheet-handle" />

        {title && (
          <div className="flex items-center justify-between px-4 pb-3 border-b border-border-dark">
            <h3 className="text-lg font-semibold">{title}</h3>
            <button
              onClick={handleClose}
              className="p-1 hover:bg-border-dark rounded-lg transition-colors"
              aria-label="Fermer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        )}

        <div className="p-4">
          {children}
        </div>
      </div>
    </>,
    document.body
  );
}

export function useBottomSheet() {
  const [isOpen, setIsOpen] = useState(false);

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);
  const toggle = () => setIsOpen(!isOpen);

  return { isOpen, open, close, toggle };
}
