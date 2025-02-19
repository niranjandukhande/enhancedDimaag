import { Search, User } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';

const MinimalNavbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <nav className="z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link
            to="/dashboard"
            className="flex items-center transition-opacity duration-300 hover:opacity-80"
          >
            <span className="text-xl font-bold text-gray-900">Company</span>
          </Link>

          <div className="flex-1 max-w-lg mx-8">
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border-b-2 border-gray-200 focus:border-gray-900 bg-transparent transition-all duration-300 outline-none placeholder:text-gray-400"
                placeholder="Search..."
              />
            </div>
          </div>

          <div className="flex items-center space-x-8">
            <Link
              to="/explore"
              className={`text-sm font-medium transition-colors duration-300 hover:text-gray-900 ${
                location.pathname === '/explore'
                  ? 'text-gray-900'
                  : 'text-gray-600'
              }`}
            >
              Explore
            </Link>
            <Button onClick={() => navigate('/profile')}>
              <div className="h-8 w-8 rounded-md bg-gray-900 p-1.5 hover:bg-gray-800 transition-colors duration-300 cursor-pointer">
                <User className="h-full w-full text-white" />
              </div>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default MinimalNavbar;
