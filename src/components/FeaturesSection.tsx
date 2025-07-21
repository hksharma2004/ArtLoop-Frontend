import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { GlowyCard } from "./GlowyCard";
import { Sparkles, Zap } from "lucide-react";

const FeaturesSection: React.FC = () => {
  return (
    <section id="features" className="relative z-10 container mx-auto px-4 md:px-6 py-8 md:py-12">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold font-display text-white">
          Why Choose ArtLoop?
        </h2>
      </div>
      <div className="grid md:grid-cols-3 gap-6 md:gap-8">
        <GlowyCard>
          <Card className="bg-gray-900/50 border-gray-800 h-full">
            <CardContent className="p-6 md:p-8 text-center">
              <div className="mb-6 flex justify-center">
                <img src="/artloop_logo.svg" className="h-10 w-10" alt="ArtLoop Logo" />
              </div>
              <h3 className="text-xl md:text-3xl font-semibold font-serif mb-4 text-white">
                Intuitive Drawing Tools
              </h3>
              <p className="text-lg font-display text-gray-400 leading-relaxed">
                No clutter, no stress. Just start drawing — even if it’s with your trackpad.
              </p>
            </CardContent>
          </Card>
        </GlowyCard>
        <GlowyCard>
          <Card className="bg-gray-900/50 border-gray-800 h-full">
            <CardContent className="p-6 md:p-8 text-center">
              <div className="mb-6 flex justify-center">
                <Sparkles className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-xl md:text-3xl font-semibold font-serif mb-4 text-white">
                AI That Actually Gets It
              </h3>
              <p className="text-lg font-display text-gray-400 leading-relaxed">
                Scribble something weird, type a prompt, and let the AI make it aesthetic.
              </p>
            </CardContent>
          </Card>
        </GlowyCard>
        <GlowyCard>
          <Card className="bg-gray-900/50 border-gray-800 h-full">
            <CardContent className="p-6 md:p-8 text-center">
              <div className="mb-6 flex justify-center">
                <Zap className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-xl md:text-3xl font-semibold font-serif mb-4 text-white">
                Fast & Smart (Mostly) 
              </h3>
              <p className="text-lg font-display text-gray-400 leading-relaxed">
                It gets text surprisingly well and turns ideas around fast. But hey, sometimes it fumbles the art.
              </p>
            </CardContent>
          </Card>
        </GlowyCard>
      </div>
    </section>
  );
};

export default FeaturesSection;