import { useAxiosClient } from '@/config/axios';
import { userType } from '@/types/userType';
import { formatDate } from '@/utils/formatDate';
import { motion } from 'framer-motion';
import { ArrowRight, Mail } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const UserCardsDisplay = () => {
  const [users, setUsers] = useState<userType[]>([]);
  const api = useAxiosClient();
  useEffect(() => {
    (async () => {
      const data = await api.get('/user/all');
      console.log(data.data);
      if (!data.data) return;
      setUsers(data.data);
    })();
  }, []);
  const navigate = useNavigate();
  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {users.map((user, index) => (
          <motion.button
            onClick={() => {
              navigate(`/explore/${user.username}`);
            }}
            key={user.username}
            className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4 hover:from-blue-100 hover:to-purple-100 transition-all duration-300 group"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="flex items-center gap-6">
              <img
                src={user.imageUrl}
                alt={user.username}
                className="w-20 h-20 rounded-full border-2 border-white shadow-md"
              />
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-lg font-semibold">{user.username}</h3>
                  <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full">
                    {formatDate(user.createdAt)}
                  </span>
                </div>
                <p className="text-gray-600 text-sm mb-2">{user.bio}</p>
                <div className="flex items-center gap-2 text-gray-500 text-sm">
                  <Mail size={14} />
                  <span>{user.email}</span>
                </div>
              </div>
              <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                <ArrowRight className="text-blue-500" />
              </div>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default UserCardsDisplay;
