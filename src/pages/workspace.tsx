
import React from 'react';
import Workspace from '@/components/Workspace';



interface User {
  _id: string;
  username: string;
  email: string;
  token: string;
  remainingGenerations: number;
}

interface WorkspacePageProps {
  user: User | null;
  onSignOut: () => void;
}


const WorkspacePage: React.FC<WorkspacePageProps> = ({ user, onSignOut }) => {
  return (
    <Workspace 
      user={user} 
      onSignOut={onSignOut}
    />
  );
};

export default WorkspacePage;
