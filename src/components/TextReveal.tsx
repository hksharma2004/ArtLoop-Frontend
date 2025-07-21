import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface TextRevealProps {
  text: string;
  className?: string;
}

const TextReveal: React.FC<TextRevealProps> = ({ text, className = 'text-5xl' }) => {
  const textRef = useRef<HTMLDivElement>(null);
  const words = text.split(' ');

  useLayoutEffect(() => {
    if (!textRef.current) return;

    const ctx = gsap.context(() => {
      const wordSpans = gsap.utils.toArray('.sui-text-reveal', textRef.current);

      wordSpans.forEach((word) => {
        gsap.to(word as HTMLElement, {
          opacity: 1,
          duration: 0.3, 
          scrollTrigger: {
            trigger: word as HTMLElement,
            start: 'top 90%', 



            toggleActions: 'play none none reverse',
            

          },
        });
      });
    }, textRef);

    return () => ctx.revert();
  }, [text]);

  return (
    <div
      ref={textRef}
      className={`max-w-[60rem] flex justify-center items-center py-20 ${className}`}
    >
      <p className="font-semibold leading-tight">
        {words.map((word, index) => (
          <span key={index} className="opacity-30 sui-text-reveal">
            {`${word} `}
          </span>
        ))}
      </p>
    </div>
  );
};

export default TextReveal;