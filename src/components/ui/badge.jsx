import React from 'react';
import { cn } from '../../lib/utils.js';

const badgeVariants = {
  default: 'border-transparent bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30 backdrop-blur-sm',
  secondary: 'border-transparent bg-white/10 text-white/80 hover:bg-white/20 backdrop-blur-sm',
  destructive: 'border-transparent bg-red-500/20 text-red-300 hover:bg-red-500/30 backdrop-blur-sm',
  outline: 'border-white/30 bg-transparent text-white/70 hover:bg-white/10 backdrop-blur-sm',
};

function Badge({ className, variant = 'default', ...props }) {
  return (
    <div
      className={cn(
        'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
        badgeVariants[variant],
        className
      )}
      {...props}
    />
  );
}

export { Badge };