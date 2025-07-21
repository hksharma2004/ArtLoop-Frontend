
import React, { ReactNode } from 'react';

interface GlowyCardProps {
  children: ReactNode;
  className?: string;
}

export const GlowyCard: React.FC<GlowyCardProps> = ({ children, className = "" }) => {
  return (
    <section className={`sui-glow-card ${className}`} data-glow>
      <div data-glow></div>
      {children}
    </section>
  );
};
