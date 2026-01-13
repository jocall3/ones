import React from 'react';
import { cn } from '../../lib/utils';

interface SpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg';
  color?: 'primary' | 'secondary' | 'accent' | 'destructive' | 'muted';
}

const Spinner = React.forwardRef<HTMLDivElement, SpinnerProps>(
  ({ className, size = 'md', color = 'primary', ...props }, ref) => {
    const sizeClasses = {
      sm: 'h-4 w-4',
      md: 'h-6 w-6',
      lg: 'h-8 w-8',
    };

    const colorClasses = {
      primary: 'border-primary',
      secondary: 'border-secondary',
      accent: 'border-accent',
      destructive: 'border-destructive',
      muted: 'border-muted',
    };

    return (
      <div
        ref={ref}
        className={cn(
          'animate-spin rounded-full border-2 border-t-transparent',
          sizeClasses[size],
          colorClasses[color],
          className
        )}
        {...props}
      />
    );
  }
);

Spinner.displayName = 'Spinner';

export { Spinner };