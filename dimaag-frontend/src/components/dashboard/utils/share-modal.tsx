'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, UserPlus } from 'lucide-react';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

import { userType } from '@/types/userType';
import { useQuery } from '@tanstack/react-query';
import { useAxiosClient } from '@/config/axios';
import toast from 'react-hot-toast';
import { useUser } from '@/hooks/useUser';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  contentId: string;
}

export function ShareModal({ isOpen, onClose, contentId }: ShareModalProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [sharedUsers, setSharedUsers] = useState<string[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<userType[]>([]);

  const api = useAxiosClient();
  const users = useUser();

  const { data, isLoading, isError } = useQuery({
    queryKey: ['shared-users', contentId],
    queryFn: async () => {
      if (!contentId) return [];
      const response = await api.get(`/permission/user/${contentId}`);
      console.log('response', response);
      return response.data;
    },
    staleTime: 60 * 1000 * 10,
  });
  useEffect(() => {
    if (users) {
      setFilteredUsers(users);
    }
  }, [data]);
  useEffect(() => {
    const toastId = isError ? toast.error('Error while loading content') : null;
    return () => toast.dismiss(toastId || '');
  }, [isError]);

  useEffect(() => {
    const toastId = isLoading ? toast.loading('Loading content...') : null;
    return () => toast.dismiss(toastId || '');
  }, [isLoading]);
  useEffect(() => {
    if (contentId && data) {
      console.log('DATA', data);
      setSharedUsers(data);
    }
  }, [contentId, data]);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredUsers([]);
      return;
    }

    const query = searchQuery.toLowerCase();
    const filtered = filteredUsers
      .filter(
        (user) =>
          user.username.toLowerCase().includes(query) ||
          user.email.toLowerCase().includes(query),
      )
      .filter((user) => !sharedUsers.includes(user.id || ''));

    setFilteredUsers(filtered);
  }, [searchQuery]);

  const addUser = (userId: string) => {
    if (!sharedUsers.includes(userId)) {
      setSharedUsers([...sharedUsers, userId]);
    }
    setSearchQuery('');
  };

  const removeUser = (userId: string) => {
    setSharedUsers(sharedUsers.filter((id) => id !== userId));
  };

  const getUserById = (userId: string) => {
    return filteredUsers.find((user) => user.id === userId);
  };

  // Coral theme colors converted to specific values
  const coralColors = {
    background: 'hsl(30, 50%, 98%)',
    foreground: 'hsl(20, 14.3%, 4.1%)',
    secondaryBg: 'hsla(30, 60%, 94%, 0.3)',
    muted: 'hsl(30, 40%, 96.1%)',
    mutedForeground: 'hsl(25, 5.3%, 44.7%)',
    accent: 'hsl(30, 65%, 60%)',
    accentAlpha: 'hsla(30, 65%, 60%, 0.2)',
    border: 'hsl(20, 5.9%, 90%)',
    secondary: 'hsl(30, 60%, 94%)',
  };

  return (
    <Dialog open={isOpen} onOpenChange={() => onClose()}>
      <DialogContent
        style={{
          backgroundColor: coralColors.background,
          color: coralColors.foreground,
          maxWidth: '28rem', // max-w-md equivalent
        }}
      >
        <DialogHeader>
          <DialogTitle>Share Content</DialogTitle>
        </DialogHeader>

        <div className="relative mt-2">
          <Search
            className="absolute left-2.5 top-2.5 h-4 w-4"
            style={{ color: coralColors.mutedForeground }}
          />
          <Input
            type="text"
            placeholder="Search people by name or email"
            className="pl-8"
            style={{
              backgroundColor: coralColors.secondaryBg,
              borderColor: coralColors.accentAlpha,
            }}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <AnimatePresence>
          {filteredUsers.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mt-2 max-h-40 overflow-y-auto rounded-md p-1"
              style={{
                backgroundColor: coralColors.background,
                borderWidth: '1px',
                borderStyle: 'solid',
                borderColor: coralColors.accentAlpha,
              }}
            >
              {filteredUsers.map((user) => (
                <motion.div
                  key={user.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center justify-between p-2 rounded-md cursor-pointer"
                  onClick={() => addUser(user.id || '')}
                >
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.imageUrl} alt={user.username} />
                      <AvatarFallback>
                        {user.username.substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">{user.username}</p>
                      <p
                        className="text-xs"
                        style={{ color: coralColors.mutedForeground }}
                      >
                        {user.email}
                      </p>
                    </div>
                  </div>
                  <UserPlus
                    className="h-4 w-4"
                    style={{ color: coralColors.accent }}
                  />
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-4">
          <h4 className="mb-2 text-sm font-medium">People with access</h4>
          <div className="space-y-2">
            {sharedUsers.length > 0 ? (
              sharedUsers.map((userId) => {
                const user = getUserById(userId);
                if (!user) return null;

                return (
                  <motion.div
                    key={user.id}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="flex items-center justify-between rounded-md p-2"
                    style={{
                      borderWidth: '1px',
                      borderStyle: 'solid',
                      borderColor: coralColors.accentAlpha,
                    }}
                  >
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={user.imageUrl} alt={user.username} />
                        <AvatarFallback>
                          {user.username.substring(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">{user.username}</p>
                        <p
                          className="text-xs"
                          style={{ color: coralColors.mutedForeground }}
                        >
                          {user.email}
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeUser(user.id || '')}
                    >
                      <X
                        className="h-4 w-4"
                        style={{ color: coralColors.mutedForeground }}
                      />
                    </Button>
                  </motion.div>
                );
              })
            ) : (
              <p
                className="text-sm"
                style={{ color: coralColors.mutedForeground }}
              >
                No users have access to this content
              </p>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
