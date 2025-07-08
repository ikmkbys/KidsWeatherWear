import React from 'react';
import { cn } from '../../lib/utils.js';

const buttonVariants = {
  default: 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white hover:from-emerald-600 hover:to-teal-700 shadow-lg hover:shadow-xl border-0 transform hover:scale-105',
  destructive: 'bg-gradient-to-r from-red-500 to-pink-600 text-white hover:from-red-600 hover:to-pink-700 shadow-lg hover:shadow-xl border-0 transform hover:scale-105',
  outline: 'border-2 border-emerald-500/50 bg-transparent text-emerald-400 hover:bg-emerald-500/10 backdrop-blur-sm',
  secondary: 'bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm border border-white/20 shadow-lg hover:shadow-xl',
  ghost: 'bg-transparent hover:bg-white/10 text-white/80 hover:text-white backdrop-blur-sm',
  link: 'text-emerald-400 underline-offset-4 hover:underline bg-transparent hover:text-emerald-300',
};

const buttonSizes = {
  default: 'h-10 px-4 py-2',
  sm: 'h-9 rounded-md px-3',
  lg: 'h-11 rounded-md px-8',
  icon: 'h-10 w-10',
};

const Button = React.forwardRef(({ className, variant = 'default', size = 'default', asChild = false, ...props }, ref) => {
  const Comp = asChild ? 'span' : 'button';
  return (
    <Comp
      className={cn(
        'inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm font-semibold ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
        buttonVariants[variant],
        buttonSizes[size],
        className
      )}
      ref={ref}
      {...props}
    />
  );
});

Button.displayName = 'Button';

export { Button };