'use client';

import { useAxiosClient } from '@/config/axios';
import type { userType } from '@/types/userType';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { User } from 'lucide-react';

const placeholderImg = '/api/placeholder/400/400';

export default function ProfileModal() {
  const [profileData, setProfileData] = useState<userType>();
  const [isOpen, setIsOpen] = useState(false);
  const api = useAxiosClient();

  useEffect(() => {
    if (isOpen) {
      fetchProfileData();
    }
  }, [isOpen]);

  const fetchProfileData = async () => {
    try {
      const response = await api.get('/user');
      console.log('Response from get user is : ', response.data);
      setProfileData(response.data);
    } catch (error) {
      console.error('Error fetching profile data:', error);
    }
  };

  const pageVariants = {
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.6 } },
    exit: { opacity: 0, y: -50, transition: { duration: 0.4 } },
  };

  return (
    <>
      {/* Profile Button */}
      <div
        onClick={() => setIsOpen(true)}
        className="h-9 w-9 rounded-full hover:bg-gray-800 p-2 bg-[#2F3C7E] transition-colors duration-300 cursor-pointer flex items-center justify-center"
      >
        <User className="h-4 w-4 text-white" />
      </div>

      {/* Profile Modal */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-4xl p-0 border-none bg-transparent shadow-none">
          <AnimatePresence mode="wait">
            {profileData && (
              <motion.div
                key="profile1"
                className="w-full bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-6"
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                <div className="w-full max-w-4xl bg-white rounded-3xl overflow-hidden shadow-xl flex flex-col md:flex-row">
                  {/* Left Side - Profile Info */}
                  <div className="md:w-1/3 bg-gradient-to-b from-blue-600 to-purple-600 p-8 text-white flex flex-col items-center justify-center relative">
                    <motion.div
                      className="absolute inset-0 bg-blue-500 opacity-30"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 1, ease: 'easeOut' }}
                      style={{
                        borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%',
                      }}
                    />

                    <motion.div
                      className="h-48 w-48 rounded-full border-4 border-white shadow-lg overflow-hidden mb-6 relative z-10"
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.3, duration: 0.5 }}
                      whileHover={{
                        scale: 1.05,
                        transition: { duration: 0.2 },
                      }}
                    >
                      <img
                        src={profileData.imageUrl || placeholderImg}
                        alt={profileData.username}
                        className="h-full w-full object-cover"
                      />
                    </motion.div>

                    <motion.h2
                      className="text-2xl font-bold mb-1 text-center"
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.5 }}
                    >
                      {profileData.username}
                    </motion.h2>

                    <motion.p
                      className="text-blue-100 mb-6 text-center"
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.6 }}
                    >
                      @{profileData.username}
                    </motion.p>

                    <motion.div
                      className="flex space-x-3"
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.7 }}
                    >
                      {['twitter', 'github', 'linkedin'].map(
                        (social, index) => (
                          <motion.div
                            key={social}
                            className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center cursor-pointer"
                            whileHover={{
                              y: -5,
                              backgroundColor: 'rgba(255,255,255,0.3)',
                            }}
                            whileTap={{ scale: 0.95 }}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.8 + index * 0.1 }}
                          >
                            <svg
                              className="h-5 w-5 text-white"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                d={
                                  social === 'twitter'
                                    ? 'M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84'
                                    : social === 'github'
                                      ? 'M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z'
                                      : 'M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z'
                                }
                              />
                            </svg>
                          </motion.div>
                        ),
                      )}
                    </motion.div>

                    <motion.div
                      className="mt-auto pt-10 text-center text-sm text-blue-100"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.9 }}
                    >
                      {/* Member since {formattedDate} */}
                    </motion.div>
                  </div>

                  {/* Right Side - Content */}
                  <div className="md:w-2/3 p-8">
                    <motion.div
                      className="mb-8"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      <h3 className="text-xl font-semibold text-gray-800 mb-3">
                        About
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {profileData.bio ||
                          "This user has not added a bio yet. They're probably busy creating amazing things!"}
                      </p>
                    </motion.div>

                    <motion.div
                      className="mb-8"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                    >
                      <h3 className="text-xl font-semibold text-gray-800 mb-3">
                        Contact
                      </h3>
                      <p className="text-gray-600 mb-2">
                        <span className="font-medium">Email:</span>{' '}
                        {profileData.email}
                      </p>
                    </motion.div>

                    <motion.button
                      className="mt-8 bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-6 rounded-lg font-medium shadow-md"
                      whileHover={{
                        scale: 1.05,
                        boxShadow: '0 10px 20px rgba(0,0,0,0.15)',
                      }}
                      whileTap={{ scale: 0.95 }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.9 }}
                    >
                      Edit Profile
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </DialogContent>
      </Dialog>
    </>
  );
}
