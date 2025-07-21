import React from "react";
import TextReveal from "./TextReveal";
import { GlowyCard } from "./GlowyCard";
import descriptionImage from "@/assets/desc-image.png"; 

const DescriptionSection: React.FC = () => {
  const scrollRevealText =
    "ArtLoop is your digital sketching companion that turns rough ideas into refined artwork, no fancy setup required. Just draw on your trackpad or tablet, describe what you're going for, and let our AI handle the rest. Whether it's a quick doodle or a detailed concept, ArtLoop understands your creative flow and transforms it into something visually stunning. It's fast, intuitive, and built for creators who want their imagination to move as quickly as they do.";

  return (
    <section className="relative z-50 w-full my-12 md:my-20 flex flex-col items-center justify-center px-6 md:px-12 py-16 md:py-24">
      <div className="flex flex-col md:flex-row items-center justify-center gap-10 md:gap-16 max-w-6xl">

        <div className="w-full md:w-1/2 flex justify-center p-4">
          <GlowyCard>
            <img
              src={descriptionImage}
              alt="A diagram showing a simple sketch being transformed into a photorealistic image by AI"
              className="rounded-2xl shadow-lg object-cover"
            />
          </GlowyCard>
        </div>


        <div className="w-full md:w-1/2 flex flex-col items-center text-center md:justify-start md:pt-12">
          <h2 className="font-display text-4xl md:text-5xl mb-0 leading-none">
            ArtLoop: What does it do?
          </h2>
          <TextReveal
            text={scrollRevealText}
            className="font-serif text-xl md:text-4xl text-wrap leading-relaxed text-gray-300 max-w-xl !mt-0"
          />
        </div>
      </div>
    </section>
  );
};

export default DescriptionSection;
