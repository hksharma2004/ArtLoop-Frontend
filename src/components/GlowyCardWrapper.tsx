import React, { useRef, useEffect, ReactNode } from 'react';

interface GlowyCardWrapperProps {
  children: ReactNode;
  hue?: number;
  size?: number;
  border?: number;
  radius?: number;
}

export const GlowyCardWrapper: React.FC<GlowyCardWrapperProps> = ({
  children,
  hue = 0, 
  size = 200,
  border = 2,
  radius = 10,
}) => {
  const glowCardWrapper = useRef<HTMLDivElement>(null);

  const syncPointer = ({ clientX: x, clientY: y }: { clientX: number; clientY: number }) => {
    if (glowCardWrapper.current) {
      glowCardWrapper.current.style.setProperty('--x', x.toFixed(2));
      glowCardWrapper.current.style.setProperty(
        '--xp',
        (x / window.innerWidth).toFixed(2)
      );
      glowCardWrapper.current.style.setProperty('--y', y.toFixed(2));
      glowCardWrapper.current.style.setProperty(
        '--yp',
        (y / window.innerHeight).toFixed(2)
      );
    }
  };

  const leaveWrapper = () => {
    if (glowCardWrapper.current) {
      glowCardWrapper.current.style.setProperty('--x', '0');
      glowCardWrapper.current.style.setProperty('--y', '0');
    }
  };

  useEffect(() => {
    const element = glowCardWrapper.current;
    if (element) {
      element.addEventListener('pointermove', syncPointer);
      element.addEventListener('pointerleave', leaveWrapper);
      
      // Set CSS variables
      element.style.setProperty('--hue', hue.toString());
      element.style.setProperty('--size', size.toString());
      element.style.setProperty('--border', border.toString());
      element.style.setProperty('--radius', radius.toString());

      return () => {
        element.removeEventListener('pointermove', syncPointer);
        element.removeEventListener('pointerleave', leaveWrapper);
      };
    }
  }, [hue, size, border, radius]);

  return (
    <main className="sui-glow-card-wrapper" ref={glowCardWrapper}>
      {children}
    </main>
  );
};