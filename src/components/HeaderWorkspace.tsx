
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { LogOut } from 'lucide-react';

interface HeaderProps {
  credits: number;
  user: { name: string } | null;
  onSignOut?: () => void;
}

const HeaderWorkspace: React.FC<HeaderProps> = ({ credits, user, onSignOut }) => {
  const navigate = useNavigate();

  return (
    <header className="flex justify-between items-center w-full flex-shrink-0">
      <div
        className="flex items-center space-x-2 cursor-pointer"
        onClick={() => navigate('/')}
      >
        <img src="/artloop_logo.svg" className="h-9 w-9" alt="ArtLoop Logo" />
        <span className="mt-2 text-2xl font-serif font-bold tracking-wider text-white">Artloop</span>
      </div>
      <div className="flex items-center space-x-4">
        <Badge variant="outline" className="text-md font-mono bg-gray-800 border-gray-700 text-gray-300 px-4 py-2">
          CREDITS: {credits}
        </Badge>
        {user && onSignOut && (
          <Button onClick={onSignOut} className="bg-white text-base font-mono text-black hover:bg-gray-300 flex items-center space-x-2">
            <LogOut className="w-5 h-5" /><span>SIGN OUT</span>
          </Button>
        )}
      </div>
    </header>
  );
};

export default HeaderWorkspace;