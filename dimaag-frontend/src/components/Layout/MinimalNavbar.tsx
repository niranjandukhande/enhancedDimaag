import { Search, User } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';
import { useState, useEffect, useRef } from 'react';
import { useAxiosClient } from '@/config/axios';
import { Input } from '../ui/input';
import { useContentStore } from '@/stores/contentStore';
import ProfileModal from '../profile/profile';

const MinimalNavbar = () => {
  const [input, setInput] = useState('');
  const api = useAxiosClient();
  const { setContents } = useContentStore();
  const timerRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

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

  useEffect(() => {
    if (location.pathname !== '/dashboard') return;

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

  return (
    // <nav className="z-50 bg-[#FBEAEB] border-b border-gray-100 shadow-sm">
    //   <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    //     <div className="flex items-center justify-between h-16">
    //       <Link
    //         to="/dashboard"
    //         className="flex items-center transition-opacity duration-300 hover:opacity-80"
    //       >
    //         <span className="text-xl font-bold text-gray-900">Company</span>
    //       </Link>

    //       <div className="flex max-w-lg mx-8 ">
    //         <div className="relative group">
    //           <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
    //             <Search className="h-5 w-5 text-gray-400" />
    //           </div>
    //           <Input
    //             value={input}
    //             onChange={(e) => {
    //               setInput(e.target.value);
    //             }}
    //             type="text"
    //             className="block w-full pl-10 pr-3 py-2 border-b-2 focus:border[#2F3C7E] bg-transparent transition-all duration-300 border-2 border-[#2F3C7E] placeholder:text-gray-400"
    //             placeholder="Search..."
    //           />
    //         </div>
    //       </div>

    //       <div className="flex items-center space-x-8">
    //         <Link
    //           to="/explore"
    //           className={`text-sm font-medium transition-colors duration-300 hover:text-gray-900 ${
    //             location.pathname === '/explore'
    //               ? 'text-gray-900'
    //               : 'text-gray-600'
    //           }`}
    //         >
    //           Explore
    //         </Link>
    //         <Button onClick={() => navigate('/profile')}>
    //           <div className="h-8 w-8 rounded-md bg-gray-900 p-1.5 hover:bg-gray-800 transition-colors duration-300 cursor-pointer">
    //             <User className="h-full w-full text-white" />
    //           </div>
    //         </Button>
    //       </div>
    //     </div>
    //   </div>
    // </nav>
    <nav className="z-50 bg-[#FBEAEB] border border-gray-100 shadow-sm rounded-full mx-4 mt-4 w-200">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-between h-14">
          <Link
            to="/dashboard"
            className="flex items-center transition-opacity duration-300 hover:opacity-80"
          >
            <span className="text-2xl font-bold text-gray-900">Company</span>
          </Link>

          <div className="flex w-96 mx-6">
            <div className="relative w-full group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <Input
                value={input}
                onChange={(e) => {
                  setInput(e.target.value);
                }}
                type="text"
                className="block w-full pl-10 pr-3 py-2 rounded-full border-2 border-[#2F3C7E] focus:ring-2 focus:ring-[#2F3C7E] focus:border-[#2F3C7E] bg-white/80 transition-all duration-300 placeholder:text-gray-400"
                placeholder="Search..."
              />
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <Link
              to="/explore"
              className={`px-4 py-1.5 text-sm font-medium rounded-full transition-colors duration-300 hover:bg-[#2F3C7E] hover:text-white ${
                location.pathname === '/explore'
                  ? 'bg-[#2F3C7E] text-white'
                  : 'text-gray-700'
              }`}
            >
              Explore
            </Link>
            <Button className="rounded-full hover:bg-[#2F3C7E] p-0 transition-colors duration-300">
              <div className="h-9 w-9 rounded-full hover:bg-gray-800 p-2 bg-[#2F3C7E] transition-colors duration-300 cursor-pointer flex items-center justify-center">
                <ProfileModal />
                {/* <User className="h-4 w-4 text-white" /> */}
              </div>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default MinimalNavbar;
