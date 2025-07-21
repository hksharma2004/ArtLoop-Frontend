import React from "react";
import { Button } from "@/components/ui/button";
import { GlowyCard } from "./GlowyCard";
import { useNavigate } from 'react-router-dom';

const CTASection: React.FC = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/auth');
  };

  return (
    <section className="relative z-10 container mx-auto px-4 md:px-6 py-8 md:py-12 text-center">
      <GlowyCard>
        <div className="p-8 md:p-12">
          <h2 className="text-4xl md:text-5xl font-bold font-serif mb-4 text-white">
            Doodle something random. Write a weird prompt.
          </h2>
          <p className="text-lg md:text-xl font-display text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
            Let ArtLoop do the rest — just pure creativity (or chaos, hopefully u won't).
          </p>
          <Button 
            onClick={handleGetStarted} 
            size="lg" 
            className="bg-white font-mono hover:bg-gray-200 text-black px-8 py-4 text-base md:text-lg font-semibold shadow-lg transition"
          >
            Start Drawing
          </Button>
        </div>
      </GlowyCard>
    </section>
  );
};

export default CTASection;