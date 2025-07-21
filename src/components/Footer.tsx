import React from "react";
import { Github, Linkedin } from "lucide-react";

const Footer: React.FC = () => {
  return (
    <footer className="relative z-10 border-t border-gray-800/50 bg-gray-900/30">
      <div className="container mx-auto px-4 md:px-6 py-8">
        <div className="flex flex-col items-center space-y-4">
          <div className="flex items-center space-x-2">
            <img src="/artloop_logo.svg" className="h-9 w-9" alt="ArtLoop Logo" />
            <span className="text-3xl font-serif font-bold mt-2">ArtLoop</span>
          </div>
          <div className="flex space-x-4">
            <a 
              href="https://github.com/hksharma2004" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-gray-400 hover:text-white transition-colors"
            >
              <Github className="w-5 h-5" />
            </a>
            <a 
              href="https://linkedin.com/in/hksharma2004" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-gray-400 hover:text-white transition-colors"
            >
              <Linkedin className="w-5 h-5" />
            </a>
          </div>
          <p className="text-sm text-gray-400">made by @hksharma2004</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;