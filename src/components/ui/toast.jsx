import React from 'react';
import { cn } from '../../lib/utils.js';

const toastVariants = {
  default: 'border bg-background text-foreground',
  destructive: 'destructive border-destructive bg-destructive text-destructive-foreground',
};

const Toast = React.forwardRef(({ className, variant = 'default', ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        'group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-6 pr-8 shadow-lg transition-all',
        toastVariants[variant],
        className
      )}
      {...props}
    />
  );
});
Toast.displayName = 'Toast';

export { Toast };