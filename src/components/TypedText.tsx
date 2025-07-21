
import React, { useRef, useEffect } from 'react';
import Typed from 'typed.js';

interface TypedTextProps {
  words: string[];
  typeSpeed?: number;
  className?: string;
}

const TypedText: React.FC<TypedTextProps> = ({ 
  words, 
  typeSpeed = 150,
  className = ''
}) => {
  const typedElement = useRef<HTMLSpanElement>(null);
  const typed = useRef<Typed | null>(null);

  useEffect(() => {
    if (!typedElement.current) return;

    typed.current = new Typed(typedElement.current, {
      strings: words,
      typeSpeed: typeSpeed,
      loop: true
    });

    return () => {
      if (typed.current) {
        typed.current.destroy();
        typed.current = null;
      }
    };
  }, [words, typeSpeed]);

  return (
    <span 
      ref={typedElement} 
      className={`sui-typed-text ${className}`}
    />
  );
};

export default TypedText;
