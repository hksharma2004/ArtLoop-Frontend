
import React, { useEffect, useRef, useState } from "react";
import { GlowyCardWrapper } from "./GlowyCardWrapper";
import Header from "./Header";
import HeroSection from "./HeroSection";
import DescriptionSection from "./DescriptionSection";
import FeaturesSection from "./FeaturesSection";
import CTASection from "./CTASection";
import Footer from "./Footer";
import { account } from "../services/appwrite"; 
import { useNavigate } from "react-router-dom";


interface AppwriteUser {
  $id: string;
  _id: string;
  name?: string;
  username: string;
  email: string;
  token?: string;
  remainingGenerations?: number;
}


const ArtLoopLanding: React.FC = () => {
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);
  const [user, setUser] = useState<AppwriteUser | undefined>(undefined);
  const lastScrollY = useRef(0);
  const navigate = useNavigate();


  useEffect(() => {
    const checkSession = async () => {
      try {
        const session = await account.get();

         const userDetails: AppwriteUser = {
           $id: session.$id,
           _id: session.$id, 
           name: session.name,
           username: session.name,
           email: session.email,

         };
        setUser(userDetails);
      } catch (error) {

        setUser(undefined);
      }
    };
    checkSession();
  }, []);


  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        setIsNavbarVisible(false);
      } else {
        setIsNavbarVisible(true);
      }
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSignOut = async () => {
    try {
      await account.deleteSession('current'); 
      setUser(undefined); 
      localStorage.removeItem('token');
      navigate('/'); 
    } catch (error) {
      console.error("Failed to sign out:", error);
    }
  };

  return (
    <GlowyCardWrapper hue={280} size={300} border={2} radius={12}>
      <div className="min-h-screen bg-black text-white relative overflow-hidden">
        <Header isNavbarVisible={isNavbarVisible} user={user} handleSignOut={handleSignOut} />
        <HeroSection />
        <DescriptionSection />
        <FeaturesSection />
        <CTASection />
        <Footer />
      </div>
    </GlowyCardWrapper>
  );
};

export default ArtLoopLanding;