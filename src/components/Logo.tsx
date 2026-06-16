import React from 'react';

interface LogoProps {
  size?: number;
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ size = 40, className = "" }) => {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 120 120" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={`${className} select-none`}
    >
      <defs>
        <linearGradient id="ringGrad" x1="10%" y1="90%" x2="90%" y2="10%">
          <stop offset="0%" stopColor="#06b6d4" />
          <stop offset="40%" stopColor="#3b82f6" />
          <stop offset="80%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#6366f1" />
        </linearGradient>
        <linearGradient id="barGrad" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#1e1b4b" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#3b82f6" />
        </linearGradient>
        <linearGradient id="arrowGrad" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#06b6d4" />
        </linearGradient>
        <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>
      
      {/* Outer Ring path - broken at top right to let arrow pass through */}
      <path 
        d="M 32 88 A 42 42 0 1 1 88 32 M 32 88 A 43 43 0 0 0 82 92" 
        stroke="url(#ringGrad)" 
        strokeWidth="6.5" 
        strokeLinecap="round"
        fill="none"
      />

      {/* Bar Chart inside */}
      <rect x="46" y="58" width="7" height="22" rx="2.5" fill="url(#barGrad)" />
      <rect x="57" y="44" width="7" height="36" rx="2.5" fill="url(#barGrad)" />
      <rect x="68" y="51" width="7" height="29" rx="2.5" fill="url(#barGrad)" />

      {/* Sweeping Arrow */}
      <path 
        d="M 30 78 Q 52 70 78 38" 
        stroke="url(#arrowGrad)" 
        strokeWidth="5" 
        fill="none" 
        strokeLinecap="round"
      />
      <path 
        d="M 68 38 L 81 33 L 77 47 Z" 
        fill="url(#arrowGrad)" 
      />

      {/* Sparkle Star at Arrow Tip */}
      <path 
        d="M 85 16 Q 85 22 91 22 Q 85 22 85 28 Q 85 22 79 22 Q 85 22 85 16 Z" 
        fill="#ffffff" 
        filter="url(#glow)"
      />
    </svg>
  );
};
