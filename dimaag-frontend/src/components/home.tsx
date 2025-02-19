import { useAuth } from '@clerk/clerk-react';
import { Link, useNavigate } from 'react-router-dom';

function Home() {
  const { isSignedIn } = useAuth();
  const navigate = useNavigate();
  if (isSignedIn) {
    navigate('/dashboard');
  }
  return (
    <div>
      <Link to={'/signin'}>Signin</Link>
      <Link to={'/signup'}>Signup</Link>
    </div>
  );
}

export default Home;
