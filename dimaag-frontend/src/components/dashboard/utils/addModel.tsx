'use client';

import type React from 'react';

import { useState } from 'react';
import { Link2 } from 'lucide-react';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useAxiosClient } from '@/config/axios';
import { contentType } from '@/types/content';
import toast from 'react-hot-toast';
import { useQueryClient } from '@tanstack/react-query';

interface AddContentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AddContentModal({ isOpen, onClose }: AddContentModalProps) {
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isPrivate, setIsPrivate] = useState(false);

  const api = useAxiosClient();
  const queryClient = useQueryClient();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const contentDetails: contentType = {
      title,
      description,
      typeOfContent: 'youtube',
      link: youtubeUrl,
      isPublic: !isPrivate, // Use the opposite of isPrivate
    };
    try {
      const res = await api.post('/content', contentDetails);
      if (res.status === 200) {
        toast.success('Content added successfully');
        setTitle('');
        setDescription('');
        setYoutubeUrl('');
        setIsPrivate(false);
      }
    } catch (error) {
      toast.error('Error adding content');
    } finally {
      onClose();
      queryClient.invalidateQueries({
        queryKey: ['infinite-content'],
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-amber-50 text-neutral-900 sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Content</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 pt-4">
          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="youtube-url" className="text-sm font-medium">
                YouTube Video URL
              </label>
              <div className="relative">
                <Link2 className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-500" />
                <Input
                  id="youtube-url"
                  type="url"
                  placeholder="https://youtube.com/watch?v=..."
                  value={youtubeUrl}
                  onChange={(e) => setYoutubeUrl(e.target.value)}
                  className="pl-9 bg-amber-100/30 border-orange-300/20"
                  required
                  pattern="^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="title" className="text-sm font-medium">
                Title
              </label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter video title"
                className="bg-amber-100/30 border-orange-300/20"
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="description" className="text-sm font-medium">
                Description
              </label>
              <Input
                id="description"
                value={description}
                placeholder="Enter video description"
                onChange={(e) => setDescription(e.target.value)}
                className="bg-amber-100/30 border-orange-300/20"
                required
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="privacy-toggle" className="text-sm font-medium">
                  Private Content
                </Label>
                <Switch
                  id="privacy-toggle"
                  checked={isPrivate}
                  onCheckedChange={setIsPrivate}
                />
              </div>
              <p className="text-xs text-neutral-500">
                {isPrivate
                  ? 'This content will only be visible to you'
                  : 'This content will be visible to everyone'}
              </p>
            </div>
          </div>

          <div className="rounded-lg border border-orange-300/20 bg-amber-100/30 p-4">
            <div className="flex items-center gap-2 mb-2">
              <Badge
                variant="outline"
                className="bg-orange-500/10 text-[hsl(30,65%,60%)]  border-orange-300/20"
              >
                AI-Powered
              </Badge>
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="ghost"
              onClick={onClose}
              className="text-neutral-700 hover:bg-amber-100/50"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-[hsl(30,65%,60%)] hover:bg-[hsl(30,65%,60%)]/90 text-[hsl(60,9.1%,97.8%)]"
            >
              Add Content
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
