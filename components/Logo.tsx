'use client';

import Image from 'next/image';
import Link from 'next/link';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  className?: string;
}

export function Logo({ size = 'md', showText = true, className = '' }: LogoProps) {
  const sizes = {
    sm: { width: 32, height: 32 },
    md: { width: 48, height: 48 },
    lg: { width: 64, height: 64 },
  };

  const { width, height } = sizes[size];

  return (
    <Link href="/" className={`flex items-center gap-2 ${className}`}>
      <Image
        src="/apex_logo_concept_no_dot.png"
        alt="Apex Logo"
        width={width}
        height={height}
        className="rounded-lg"
        priority
      />
      {showText && (
        <span className="font-bold text-white text-lg">APEX</span>
      )}
    </Link>
  );
}

export function LogoHeader() {
  return (
    <div className="flex items-center justify-center py-4">
      <Logo size="md" />
    </div>
  );
}
