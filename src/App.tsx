import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";


import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";


import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import WorkspacePage from '@/pages/workspace';
import AuthPage from '@/pages/Auth';


import { account } from "@/services/appwrite";


interface User {
  $id: string;
  name: string;
  email: string;
  prefs: {

    [key: string]: unknown; 
  };
}

const App = () => {

  const [currentUser, setCurrentUser] = useState<User | null>(null);
  

  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    const checkUserSession = async () => {
      try {

        const user = await account.get();
        setCurrentUser(user as User);
        console.log('Active session found. User:', user);
      } catch (error) {

        console.log("No active session found.");
        setCurrentUser(null);
      } finally {

        setIsLoading(false);
      }
    };

    checkUserSession();
  }, []); 


  const handleLoginSuccess = (userData: User) => {
    setCurrentUser(userData);
  };


  const handleSignOut = async () => {
    try {

      await account.deleteSession('current');

      setCurrentUser(null);
    } catch (error) {
      console.error("Failed to sign out:", error);
    }
  };


  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-black text-white font-serif text-2xl">
        LOADING YOUR CANVAS...
      </div>
    );
  }


  return (
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>

          <Route path="/" element={<Index />} />


          <Route
            path="/workspace"
            element={
              currentUser ? (

                <WorkspacePage user={currentUser} onSignOut={handleSignOut} />
              ) : (

                <Navigate to="/auth" />
              )
            }
          />


          <Route
            path="/auth"
            element={
              currentUser ? (

                <Navigate to="/workspace" />
              ) : (

                <AuthPage onLoginSuccess={handleLoginSuccess} />
              )
            }
          />


          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  );
};

export default App;