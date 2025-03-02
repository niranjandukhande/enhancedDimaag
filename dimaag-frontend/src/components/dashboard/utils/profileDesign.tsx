'use client';

import type React from 'react';

import { motion } from 'framer-motion';
import { Check, Loader2, Mail } from 'lucide-react';
import { useEffect, useState } from 'react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { useAxiosClient } from '@/config/axios';
import { formatDate } from '@/utils/formatDate';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface UserData {
  username: string;
  email: string;
  bio?: string;
  imageUrl: string;
  createdAt: string;
}

export function ProfileModalDesign1({ isOpen, onClose }: ProfileModalProps) {
  const [user, setUser] = useState<UserData | null>(null);
  const [formData, setFormData] = useState({
    username: '',
    bio: '',
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const api = useAxiosClient();

  useEffect(() => {
    if (isOpen) {
      fetchProfileData();
    }
  }, [isOpen, api]);

  const fetchProfileData = async () => {
    setIsLoading(true);
    try {
      const response = await api.get('/user');
      console.log('Response from get user is : ', response.data);
      setUser(response.data);
      setFormData({
        username: response.data.username,
        bio: response.data.bio || '',
      });
    } catch (error) {
      console.error('Error fetching profile data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setIsUploading(true);
    try {
      // Only update username and bio, as per requirements
      await api.put('/user/update', {
        username: formData.username,
        bio: formData.bio,
      });

      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        onClose();
      }, 1000);
    } catch (error) {
      console.error('Error updating profile:', error);
    } finally {
      setIsUploading(false);
    }
  };

  // Show loading state when fetching initial data
  if (isLoading || !user) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="bg-amber-50 text-neutral-900 sm:max-w-[425px]">
          <div className="flex justify-center items-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-orange-500" />
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-amber-50 text-neutral-900 sm:max-w-[425px] overflow-hidden">
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
          <DialogDescription className="text-neutral-700">
            Make changes to your profile information.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6 pt-4">
          <div className="flex flex-col items-center gap-4">
            <motion.div
              className="relative"
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              <div className="relative group rounded-full overflow-hidden">
                <Avatar className="h-24 w-24 border-4 border-white">
                  <AvatarImage
                    src={user.imageUrl}
                    className="transition-transform duration-200"
                  />
                  <AvatarFallback className="bg-orange-100 text-orange-700">
                    {user.username.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="text-xs text-white text-center px-2">
                    Profile photo cannot be changed
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <label htmlFor="username" className="text-sm font-medium">
                Username
              </label>
              <Input
                id="username"
                value={formData.username}
                onChange={(e) =>
                  setFormData({ ...formData, username: e.target.value })
                }
                className="bg-amber-100/30 border-orange-300/20"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>
              <Input
                id="email"
                type="email"
                value={user.email}
                disabled
                readOnly
                className="bg-amber-100/30 border-orange-300/20 opacity-70 cursor-not-allowed"
              />
              <p className="text-xs text-neutral-500 mt-1">
                Email cannot be changed
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <label htmlFor="bio" className="text-sm font-medium">
                Bio
              </label>
              <textarea
                id="bio"
                value={formData.bio}
                onChange={(e) =>
                  setFormData({ ...formData, bio: e.target.value })
                }
                className="w-full min-h-[100px] rounded-md border border-orange-300/20 bg-amber-100/30 p-3 text-sm"
              />
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="border-t border-amber-200 pt-4"
          >
            <div className="flex items-center gap-2 text-sm text-neutral-500 mb-4">
              <Mail className="h-4 w-4" />
              Joined {formatDate(user.createdAt)}
            </div>
          </motion.div>

          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="ghost"
              onClick={onClose}
              disabled={isUploading}
              className="relative text-neutral-700 hover:bg-amber-100/50"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-[hsl(30,65%,60%)] hover:bg-[hsl(30,65%,60%)]/90 text-[hsl(60,9.1%,97.8%)] relative"
              disabled={isUploading}
            >
              {isUploading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : isSuccess ? (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="flex items-center"
                >
                  <Check className="h-4 w-4 mr-2" />
                  Saved
                </motion.div>
              ) : (
                'Save Changes'
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
