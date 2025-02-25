import { Search, User } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';
import { useState, useEffect, useRef } from 'react';
import { useAxiosClient } from '@/config/axios';
import { Input } from '../ui/input';
import { useContentStore } from '@/stores/content';

const MinimalNavbar = () => {
  const [input, setInput] = useState('');
  const api = useAxiosClient();
  const { setContents } = useContentStore();
  const timerRef = useRef(null);

  const fetchSearchResults = async (query: string) => {
    if (query === '') return;

    try {
      const response = await api.post('/content/search', { query });
      console.log('Response from search query is : ', response.data);
      setContents(response.data);
    } catch (error) {
      console.error('Search error:', error);
    }
  };

  // Effect for debounced search
  useEffect(() => {
    // Clear previous timer
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    // Set new timer for 3 seconds
    if (input !== '') {
      //@ts-ignore
      timerRef.current = setTimeout(() => {
        fetchSearchResults(input);
      }, 500);
    }

    // Cleanup function
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [input]); // Run effect when input changes

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

          <div className="flex max-w-lg mx-8">
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <Input
                value={input}
                onChange={(e) => {
                  setInput(e.target.value);
                }}
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
