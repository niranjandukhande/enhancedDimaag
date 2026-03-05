import { useAuth } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';

export const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const { userId } = useAuth();
  const navigate = useNavigate();

  if (userId) {
    navigate('/dashboard');
  }

  return children;
};
