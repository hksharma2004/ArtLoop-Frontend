
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import ArtLoopLanding from '@/components/ArtloopLanding';




interface IndexPageProps {
  user?: {
    $id: string;
    name?: string;
    email: string;
  };
}

const Index: React.FC<IndexPageProps> = ({ user }) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  
  const handleGetStarted = async () => {
    if (user) {
      navigate('/workspace');
      return;
    }



    toast.info("Please sign in to continue.");
    navigate('/auth');
  };


  return (
    <ArtLoopLanding
      user={user}
      isLoading={isLoading}
      handleGetStarted={handleGetStarted}
    />
  );
};

export default Index;
