'use client';

import type React from 'react';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { motion, AnimatePresence } from 'framer-motion';
import { Share2, Search, UserMinus } from 'lucide-react';
import { contentType } from '@/types/content';
import { userType } from '@/types/userType';
import { useAxiosClient } from '@/config/axios';

type EditModalProps = {
  isOpen: boolean;
  onClose: () => void;
  content: contentType;
  onSave: (updatedContent: contentType) => void;
};

export default function EditModal({
  isOpen,
  onClose,
  content,
  onSave,
}: EditModalProps) {
  const [editedContent, setEditedContent] = useState<contentType>(content);
  const [isSharing, setIsSharing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [confirmShareModal, setConfirmShareModal] = useState({
    isOpen: false,
    user: null,
  });
  const [users, setUsers] = useState<userType[]>([]);

  const api = useAxiosClient();

  useEffect(() => {
    (async () => {
      const response = await api.get('/user/all');
      console.log('response form get users all,', response.data);
      setUsers(users);
    })();
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setEditedContent((prev) => ({ ...prev, [name]: value }));
  };

  const handleSwitchChange = (checked: boolean) => {
    setEditedContent((prev) => ({ ...prev, isPublic: checked }));
  };

  const handleSave = () => {
    onSave(editedContent);
    onClose();
  };

  const toggleSharing = () => {
    setIsSharing(!isSharing);
  };

  const filteredUsers = users.filter(
    (user) =>
      user.username.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !editedContent.sharedWith.includes(user.username),
  );

  const handleShareConfirm = (user) => {
    setEditedContent((prev) => ({
      ...prev,
      sharedWith: [...prev.sharedWith, user.username],
    }));
    setConfirmShareModal({ isOpen: false, user: null });
  };

  const handleRemoveAccess = (userName: string) => {
    setEditedContent((prev) => ({
      ...prev,
      sharedWith: prev.sharedWith.filter((name) => name !== userName),
    }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Edit Content</DialogTitle>
        </DialogHeader>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.3 }}
          className="bg-gradient-to-br from-purple-50 to-indigo-50 p-6 rounded-lg shadow-lg"
        >
          <div className="space-y-6">
            <div>
              <Label
                htmlFor="title"
                className="text-lg font-semibold text-indigo-700"
              >
                Title
              </Label>
              <Input
                id="title"
                name="title"
                value={editedContent.title}
                onChange={handleInputChange}
                className="mt-2 bg-white/50 border-indigo-200 focus:border-indigo-400 focus:ring-indigo-300"
              />
            </div>
            <div>
              <Label
                htmlFor="description"
                className="text-lg font-semibold text-indigo-700"
              >
                Description
              </Label>
              <Textarea
                id="description"
                name="description"
                value={editedContent.description}
                onChange={handleInputChange}
                className="mt-2 bg-white/50 border-indigo-200 focus:border-indigo-400 focus:ring-indigo-300"
              />
            </div>
            <div className="flex items-center justify-between">
              <Label
                htmlFor="isPublic"
                className="text-lg font-semibold text-indigo-700"
              >
                Public
              </Label>
              <Switch
                id="isPublic"
                checked={editedContent.isPublic}
                onCheckedChange={handleSwitchChange}
                className="data-[state=checked]:bg-indigo-500"
              />
            </div>
          </div>
          <div className="mt-8 flex justify-between">
            <Button
              variant="outline"
              onClick={toggleSharing}
              className="bg-white hover:bg-indigo-50"
            >
              {isSharing ? 'Cancel Sharing' : 'Manage Sharing'}
            </Button>
            <Button
              onClick={handleSave}
              className="bg-indigo-600 hover:bg-indigo-700"
            >
              Save changes
            </Button>
          </div>
          <AnimatePresence>
            {isSharing && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-6 bg-white/80 backdrop-blur-sm rounded-lg p-4 shadow-lg"
              >
                <h3 className="text-lg font-semibold mb-4">Manage Sharing</h3>
                <div className="mb-4">
                  <Label htmlFor="search" className="sr-only">
                    Search users
                  </Label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <Input
                      id="search"
                      type="text"
                      placeholder="Search users"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 bg-white/50 border-indigo-200 focus:border-indigo-400 focus:ring-indigo-300"
                    />
                  </div>
                </div>
                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {filteredUsers.map((user) => (
                    <motion.div
                      key={user.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.2 }}
                      className="flex items-center justify-between p-2 hover:bg-gray-100 rounded-md transition-colors duration-200"
                    >
                      <div className="flex items-center space-x-3">
                        <Avatar>
                          <AvatarImage
                            src={user.imageUrl}
                            alt={user.username}
                          />
                          <AvatarFallback>
                            {user.username.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <span>{user.username}</span>
                      </div>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() =>
                          setConfirmShareModal({ isOpen: true, user })
                        }
                      >
                        <Share2 className="w-4 h-4 mr-2" />
                        Share
                      </Button>
                    </motion.div>
                  ))}
                </div>
                <div className="mt-6">
                  <h4 className="text-md font-semibold mb-2">Shared with:</h4>
                  <div className="space-y-2">
                    {editedContent.sharedWith.map((userName) => (
                      <div
                        key={userName}
                        className="flex items-center justify-between p-2 bg-indigo-50 rounded-md"
                      >
                        <span>{userName}</span>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleRemoveAccess(userName)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <UserMinus className="w-4 h-4 mr-2" />
                          Remove
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </DialogContent>
      <Dialog
        open={confirmShareModal.isOpen}
        onOpenChange={() => setConfirmShareModal({ isOpen: false, user: null })}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Sharing</DialogTitle>
          </DialogHeader>
          <p>
            Are you sure you want to share this content with{' '}
            {confirmShareModal.user?.name}?
          </p>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() =>
                setConfirmShareModal({ isOpen: false, user: null })
              }
            >
              Cancel
            </Button>
            <Button onClick={() => handleShareConfirm(confirmShareModal.user)}>
              Confirm
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Dialog>
  );
}
