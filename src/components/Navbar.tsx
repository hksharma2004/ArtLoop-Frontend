import React, { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);
  const navigate = useNavigate();


  const handleSignIn = () => {
    navigate('/auth', { state: { isSignUp: false } });
  };
  

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    element?.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest",
    });

    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
  };


  const updateNavbarVisibility = () => {
    const currentScrollY = window.scrollY;
    const scrollDifference = Math.abs(currentScrollY - lastScrollY.current);
    

    if (scrollDifference < 5) {
      ticking.current = false;
      return;
    }
    

    if (currentScrollY <= 10) {
      setIsNavbarVisible(true);
    }

    else if (currentScrollY < lastScrollY.current) {
      setIsNavbarVisible(true);
    }

    else if (currentScrollY > lastScrollY.current && currentScrollY > 10) {
      setIsNavbarVisible(false);
    }
    
    lastScrollY.current = currentScrollY;
    ticking.current = false;
  };


  useEffect(() => {
    const handleScroll = () => {

      if (!ticking.current) {
        requestAnimationFrame(updateNavbarVisibility);
        ticking.current = true;
      }
    };


    lastScrollY.current = window.scrollY;

    window.addEventListener('scroll', handleScroll, { passive: true });


    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);


  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsMenuOpen(false);
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (isMenuOpen && !target.closest('nav')) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('keydown', handleEscape);
      document.addEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isMenuOpen]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 border-b border-gray-800/30 backdrop-blur-md transition-transform duration-300 ease-in-out ${
        isNavbarVisible ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <nav className="container mx-auto px-4 sm:px-6 py-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => navigate('/')}>
            <img src="/artloop_logo.svg" className="h-9 w-9" alt="ArtLoop Logo" />
            <span className="text-3xl font-serif font-bold">ArtLoop</span>
          </div>


          <div className="hidden md:flex items-center space-x-8">
            <a 
              href="#features" 
              onClick={(e) => handleScrollTo(e, 'features')} 
              className="font-display hover:text-gray-400 text-lg transition-colors duration-200"
            >
              Features
            </a>
            <Button
              variant="outline"
              className="font-mono rounded-full text-black text-lg hover:text-black bg-white hover:bg-gray-200 transition-colors duration-200"
              onClick={handleSignIn}
            >
              Sign In
            </Button>
          </div>


          <div className="md:hidden">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)} 
              aria-label="Toggle Menu"
              className="p-2 hover:bg-gray-800/50 rounded-md transition-colors duration-200"
            >
              {isMenuOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
            </button>
          </div>
        </div>


        <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isMenuOpen ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="pt-4 pb-2 space-y-2">
            <a 
              href="#features" 
              onClick={(e) => handleScrollTo(e, 'features')} 
              className="block py-2 text-lg font-display hover:text-gray-400 transition-colors duration-200"
            >
              Features
            </a>
            <Button
              variant="outline"
              className="w-full mt-2 font-mono rounded-full text-black text-lg hover:text-black bg-white hover:bg-gray-200 transition-colors duration-200"
              onClick={handleSignIn}
            >
              Sign In
            </Button>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
