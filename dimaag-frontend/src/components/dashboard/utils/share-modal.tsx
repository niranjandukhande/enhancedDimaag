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
import { contentAccess, dummyUsers } from './data';
import { userType } from '@/types/userType';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  contentId: string;
}

export function ShareModal({ isOpen, onClose, contentId }: ShareModalProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [sharedUsers, setSharedUsers] = useState<string[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<userType[]>([]);

  useEffect(() => {
    if (contentId && contentAccess[contentId as keyof typeof contentAccess]) {
      setSharedUsers(contentAccess[contentId as keyof typeof contentAccess]);
    } else {
      setSharedUsers([]);
    }
  }, [contentId]);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredUsers([]);
      return;
    }

    const query = searchQuery.toLowerCase();
    const filtered = dummyUsers
      .filter(
        (user) =>
          user.username.toLowerCase().includes(query) ||
          user.email.toLowerCase().includes(query),
      )
      .filter((user) => !sharedUsers.includes(user.id || ''));

    setFilteredUsers(filtered);
  }, [searchQuery, sharedUsers]);

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
    return dummyUsers.find((user) => user.id === userId);
  };

  return (
    <Dialog open={isOpen} onOpenChange={() => onClose()}>
      <DialogContent className="theme-coral max-w-md">
        <DialogHeader>
          <DialogTitle>Share Content</DialogTitle>
        </DialogHeader>

        <div className="relative mt-2">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search people by name or email"
            className="pl-8 bg-secondary/30 border-accent/20"
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
              className="mt-2 max-h-40 overflow-y-auto rounded-md border border-accent/20 bg-background p-1"
            >
              {filteredUsers.map((user) => (
                <motion.div
                  key={user.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center justify-between p-2 rounded-md hover:bg-secondary cursor-pointer"
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
                      <p className="text-xs text-muted-foreground">
                        {user.email}
                      </p>
                    </div>
                  </div>
                  <UserPlus className="h-4 w-4 text-accent" />
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
                    className="flex items-center justify-between rounded-md border border-accent/20 p-2"
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
                        <p className="text-xs text-muted-foreground">
                          {user.email}
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeUser(user.id || '')}
                    >
                      <X className="h-4 w-4 text-muted-foreground" />
                    </Button>
                  </motion.div>
                );
              })
            ) : (
              <p className="text-sm text-muted-foreground">
                No users have access to this content
              </p>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
