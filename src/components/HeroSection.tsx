import React from "react";
import { Button } from "@/components/ui/button";
import { GlowyCard } from "./GlowyCard";
import TypedText from "./TypedText";
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { RetroGrid } from "@/components/magicui/retro-grid";
import heroImage from "@/assets/hero-image.png";
import { ArrowRight } from 'lucide-react';

const HeroSection: React.FC = () => {
  const navigate = useNavigate();

  const heroWords = [
    "Amazing Art with AI",
    "Digital Artwork",
    "Illustrations",
    "Creative Masterpieces",
  ];

  const handleGetStarted = () => {
    navigate('/auth');
  };

  const heroContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.5,
      },
    },
  };

  const heroItemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1]
      }
    },
  };

  return (
    <section className="relative z-10 w-full min-h-[80vh] flex items-center justify-center px-4 pt-16 pb-8 overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-white/20 to-transparent pointer-events-none -z-10" />
      <RetroGrid />
      <motion.div
        className="relative z-20 text-center max-w-4xl"
        variants={heroContainerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1
          className="text-5xl lg:text-7xl font-light mb-4 text-white font-serif leading-tight"
          variants={heroItemVariants}
        >
          Create{" "}
          <span className="font-mono font-medium">
            <TypedText words={heroWords} typeSpeed={50} />
          </span>
        </motion.h1>
        <motion.p
          className="text-lg font-display md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed"
          variants={heroItemVariants}
        >
          Scribble your dreams, dump your thoughts, and let AI go wild with it.
        </motion.p>
        <motion.div className="flex justify-center" variants={heroItemVariants}>
            <Button onClick={handleGetStarted}
              size="lg"
              className="bg-white text-black hover:bg-gray-200 px-8 py-5 text-base md:text-lg font-medium font-mono rounded-full transition-transform duration-300 hover:scale-105 flex items-center group"
            >
              Get started
              <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
        </motion.div>

        <motion.div 
          className="mt-16 flex justify-center" 
          variants={heroItemVariants}
          whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
        >
          <GlowyCard className="rounded-lg">
            <img
              src={heroImage}
              alt="AI generated artwork of an infinity symbol"
              className="rounded-lg shadow-2xl max-w-md w-full" 
            />
          </GlowyCard>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;