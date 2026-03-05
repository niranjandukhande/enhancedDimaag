import { useAuth } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { userId } = useAuth();
  const navigate = useNavigate();

  if (!userId) {
    navigate('/signin');
  }

  return children;
};
