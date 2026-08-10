import React from 'react';

export function StickerCard({
  children,
  className = '',
  bgColor = 'bg-white',
  size = 'md', // sm, md, lg
  hover = true
}) {
  let shadowClass = 'shadow-[6px_6px_0px_#1A1A1A]';
  if (size === 'sm') shadowClass = 'shadow-[4px_4px_0px_#1A1A1A]';
  if (size === 'lg') shadowClass = 'shadow-[8px_8px_0px_#1A1A1A]';

  const hoverClass = hover ? 'transition-all duration-150 hover:-translate-y-1 hover:shadow-[8px_8px_0px_#1A1A1A]' : '';

  return (
    <div className={`relative border border-black rounded-2xl p-6 ${bgColor} ${shadowClass} ${hoverClass} ${className}`}>
      {children}
    </div>
  );
}
