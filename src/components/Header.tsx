// header.tsx
import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Menu, X, LogOut } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

interface HeaderProps {
  isNavbarVisible: boolean;
  user?: {
    $id: string;
    _id: string;
    name?: string;
    username: string;
    email: string;
    token?: string;
    remainingGenerations?: number;
  };
  handleSignOut: () => void;
}

const Header: React.FC<HeaderProps> = ({ isNavbarVisible, user, handleSignOut }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const profileMenuRef = useRef<HTMLDivElement>(null);

  const handleSignIn = () => {
    navigate('/auth', { state: { isSignUp: false } });
  };

  const headerVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.42, 0, 0.58, 1] as const
      }
    },
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target as Node)) {
        setIsProfileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [profileMenuRef]);

  return (
    <motion.header
      className={`sticky top-0 z-50 bg-black/60 backdrop-blur-lg transition-transform duration-300 border-b border-gray-800/50 ${isNavbarVisible ? 'translate-y-0' : '-translate-y-full'}`}
      variants={headerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="absolute bottom-0 left-0 w-full h-8 bg-gradient-to-t from-transparent to-black/60 via-black/30 -z-10"></div>
      <nav className="container mx-auto px-6 py-3">
        <div className="flex items-center justify-between">
          <div
            className="flex flex-col items-center cursor-pointer"
            onClick={() => navigate('/')}
          >
            <img src="/artloop_logo.svg" className="h-9 w-9" alt="ArtLoop Logo" />
            <span className="text-xl font-serif font-bold">ArtLoop</span>
          </div>

          <div className="hidden md:flex items-center space-x-6">
            <a href="#features" className="font-display hover:text-gray-300 text-xl transition-colors px-4 py-2">Features</a>
            {user ? (
              <div className="relative" ref={profileMenuRef}>
                <Avatar
                  className="h-10 w-10 rounded-full border-2 border-white/20 hover:border-white/40 transition-colors cursor-pointer"
                  onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                >
                  <AvatarImage src={`https://images.unsplash.com/photo-1657497850541-b0199c958846?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D${user.$id}`} />
                  <AvatarFallback>{user.name?.charAt(0) || user.email.charAt(0)}</AvatarFallback>
                </Avatar>
                <AnimatePresence>
                  {isProfileMenuOpen && (
                    <motion.div
                      className="absolute right-0 mt-2 w-56 bg-black border border-zinc-800 rounded-xl shadow-2xl overflow-hidden"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                    >
                      <div className="px-4 py-3 border-b border-zinc-800">
                        <p className="text-base font-semibold text-white truncate">{user.name || user.username}</p>
                        <p className="text-sm text-zinc-400 truncate">{user.email}</p>
                      </div>
                      <button
                        onClick={() => {
                          handleSignOut();
                          setIsProfileMenuOpen(false);
                        }}
                        className="w-full text-left px-4 py-3 text-sm text-zinc-300 hover:bg-zinc-900 transition-colors flex items-center"
                      >
                        <LogOut className="w-4 h-4 mr-3" />
                        Sign Out
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Button
                variant="outline"
                className="font-mono rounded-full text-black hover:text-black px-6 text-lg"
                onClick={handleSignIn}
              >
                Sign In
              </Button>
            )}
          </div>

          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className="md:hidden mt-4"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <a href="#features" className="block py-2 text-lg font-display hover:text-gray-400 transition-colors" onClick={() => setIsMenuOpen(false)}>Features</a>
              {user ? (
                <div className="mt-4">
                  <div className="flex items-center justify-between py-2">
                    <Avatar className="h-10 w-10 rounded-full border-2 border-white/20">
                      <AvatarImage src={`https://source.unsplash.com/random/100x100/?portrait&${user.$id}`} />
                      <AvatarFallback>{user.name?.charAt(0) || user.email.charAt(0)}</AvatarFallback>
                    </Avatar>
                     <Button
                        onClick={handleSignOut}
                        variant="ghost"
                        className="text-zinc-300 hover:text-white flex items-center"
                      >
                        <LogOut className="w-4 h-4 mr-2" />
                        Sign Out
                      </Button>
                  </div>
                </div>
              ) : (
                <Button
                  variant="outline"
                  className="w-full mt-4 font-mono rounded-full text-black text-lg hover:text-black"
                  onClick={handleSignIn}
                >
                  Sign In
                </Button>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
};

export default Header;