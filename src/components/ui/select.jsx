import React from 'react';
import { cn } from '../../lib/utils.js';

const Select = ({ children, value, onValueChange, ...props }) => {
  // Extract the options from SelectContent > SelectItem children
  const content = React.Children.toArray(children).find(
    child => child.type === SelectContent
  );
  
  const options = content ? React.Children.toArray(content.props.children) : [];
  
  // Extract placeholder from SelectTrigger > SelectValue
  const trigger = React.Children.toArray(children).find(
    child => child.type === SelectTrigger
  );
  
  const selectValue = trigger ? React.Children.toArray(trigger.props.children).find(
    child => child.type === SelectValue
  ) : null;
  
  const placeholder = selectValue?.props?.placeholder || "選択してください";

  return (
    <select
      className={cn(
        'h-12 w-full rounded-xl border border-white/20 bg-white/10 backdrop-blur-sm px-4 py-3 text-white focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/50 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-300',
        trigger?.props?.className
      )}
      value={value || ''}
      onChange={(e) => onValueChange?.(e.target.value)}
      {...props}
    >
      <option value="" disabled className="bg-gray-800 text-gray-400">
        {placeholder}
      </option>
      {options.map((option, index) => (
        <option 
          key={index} 
          value={option.props.value} 
          className="bg-gray-800 text-white py-2"
        >
          {option.props.children}
        </option>
      ))}
    </select>
  );
};

const SelectContent = ({ children, ...props }) => (
  <div style={{ display: 'none' }} {...props}>{children}</div>
);

const SelectItem = ({ value, children, ...props }) => (
  <span data-value={value} {...props}>{children}</span>
);

const SelectTrigger = ({ className, children, ...props }) => (
  <span className={className} {...props}>{children}</span>
);

const SelectValue = ({ placeholder }) => (
  <span data-placeholder={placeholder}></span>
);

export { Select, SelectContent, SelectItem, SelectTrigger, SelectValue };