import React from 'react';
import { cn } from '../../lib/utils.js';

const Select = ({ children, value, onValueChange }) => {
  return (
    <div className="relative">
      {React.Children.map(children, child => {
        if (child.type === SelectTrigger) {
          return React.cloneElement(child, { value, onValueChange });
        }
        return child;
      })}
    </div>
  );
};

const SelectTrigger = React.forwardRef(({ className, children, value, onValueChange, ...props }, ref) => (
  <select
    className={cn(
      'flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
      className
    )}
    ref={ref}
    value={value}
    onChange={(e) => onValueChange && onValueChange(e.target.value)}
    {...props}
  >
    {children}
  </select>
));
SelectTrigger.displayName = 'SelectTrigger';

const SelectValue = ({ placeholder }) => null; // この場合は不要

const SelectContent = ({ children }) => children;

const SelectItem = ({ value, children }) => (
  <option value={value}>{children}</option>
);

export { Select, SelectTrigger, SelectValue, SelectContent, SelectItem };