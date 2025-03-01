'use client';

import { useEffect, useState } from 'react';

import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Clock,
  Edit,
  ExternalLink,
  Globe,
  Lock,
  Save,
  Share2,
  X,
} from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useAxiosClient } from '@/config/axios';
import { contentType } from '@/types/content';
import { formatDate } from '@/utils/formatDate';
import { useUser } from '@clerk/clerk-react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import { ShareModal } from './share-modal';
import { TopNavigation } from './top-navigation';

export default function Design2Detail() {
  const params = useParams();

  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState('');
  const [editedDescription, setEditedDescription] = useState('');
  const [shareModalOpen, setShareModalOpen] = useState(false);

  const [currentContent, setCurrentContent] = useState<contentType>();
  const navigate = useNavigate();
  const api = useAxiosClient();
  const {
    data: content,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['content-details', params.id],
    queryFn: async () => {
      const response = await api.get(`/content/${params.id}`);
      return response.data;
    },
    staleTime: 60 * 1000 * 10,
  });
  useEffect(() => {
    const toastId = isError ? toast.error('Error while loading content') : null;
    return () => toast.dismiss(toastId || '');
  }, [isError]);

  useEffect(() => {
    const toastId = isLoading ? toast.loading('Loading content...') : null;
    return () => toast.dismiss(toastId || '');
  }, [isLoading]);

  useEffect(() => {
    if (content) {
      console.log('content', content);
      setCurrentContent(content);
    }
  }, [content, setCurrentContent]);
  const colors = {
    background: 'hsl(30 50% 98%)',
    foreground: 'hsl(20 14.3% 4.1%)',
    card: 'hsl(0 0% 100%)',
    cardForeground: 'hsl(20 14.3% 4.1%)',
    primary: 'hsl(12 91% 55%)',
    primaryForeground: 'hsl(60 9.1% 97.8%)',
    secondary: 'hsl(30 60% 94%)',
    secondaryForeground: 'hsl(24 9.8% 10%)',
    muted: 'hsl(30 40% 96.1%)',
    mutedForeground: 'hsl(25 5.3% 44.7%)',
    accent: 'hsl(30 65% 60%)',
    accentForeground: 'hsl(60 9.1% 97.8%)',
    destructive: 'hsl(0 72.2% 50.6%)',
    destructiveForeground: 'hsl(60 9.1% 97.8%)',
    border: 'hsl(20 5.9% 90%)',
    input: 'hsl(20 5.9% 90%)',
    ring: 'hsl(12 91% 55%)',
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const queryClient = useQueryClient();
  const handleSave = async () => {
    console.log('title descrption', editedDescription, editedTitle);
    if (currentContent) {
      try {
        const res = await api.put(`/content/${currentContent.id}`, {
          editedDescription,
          editedTitle,
        });
        if (res.status === 200) {
          toast.success('updated successFully');
        }
      } catch (error) {
        toast.error('failed to edit');
      } finally {
        queryClient.invalidateQueries({
          queryKey: ['infinite-content'],
        });
        setIsEditing(false);
      }

      console.log('NEW CONTENT', currentContent);
    }
  };
  const { user } = useUser();

  const handleCancel = () => {
    if (currentContent) {
      setEditedTitle(currentContent.title);
      setEditedDescription(currentContent.description);
    }
    setIsEditing(false);
  };

  const getYouTubeVideoId = (url: string | undefined) => {
    if (!url) return null;

    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  const getYoutubeEmbedUrl = (url: string | undefined) => {
    if (!url) return '';

    const videoId = getYouTubeVideoId(url);
    return videoId ? `https://www.youtube.com/embed/${videoId}` : '';
  };
  if (!content) {
    return (
      <div
        className="flex items-center justify-center min-h-screen"
        style={{ backgroundColor: colors.background }}
      >
        <div className="animate-pulse text-center">
          <div
            className="rounded-full h-12 w-12 mx-auto mb-4"
            style={{ backgroundColor: `${colors.accent}80` }}
          ></div>
          <p className="text-lg" style={{ color: colors.mutedForeground }}>
            Loading content...
          </p>
        </div>
      </div>
    );
  }
  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: colors.background }}
    >
      <TopNavigation />

      <div className="container mx-auto px-4 py-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            style={{ color: colors.mutedForeground }}
            className="mb-6"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to All Content
          </Button>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
            <div className="flex items-center gap-2">
              <Badge
                variant="outline"
                style={{
                  backgroundColor: `${colors.accent}1A`,
                  color: colors.accent,
                  borderColor: `${colors.accent}33`,
                }}
              >
                {currentContent?.typeOfContent}
              </Badge>
              {currentContent?.isPublic ? (
                <Badge
                  variant="secondary"
                  className="flex items-center gap-1"
                  style={{
                    backgroundColor: colors.secondary,
                    color: colors.secondaryForeground,
                  }}
                >
                  <Globe className="h-3 w-3" /> Public
                </Badge>
              ) : (
                <Badge
                  variant="outline"
                  className="flex items-center gap-1"
                  style={{
                    borderColor: colors.border,
                    color: colors.foreground,
                  }}
                >
                  <Lock className="h-3 w-3" /> Private
                </Badge>
              )}
            </div>

            <div className="flex items-center gap-2">
              {isEditing ? (
                <>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleCancel}
                    style={{ color: colors.foreground }}
                  >
                    <X className="mr-1 h-4 w-4" />
                    Cancel
                  </Button>
                  <Button
                    size="sm"
                    onClick={handleSave}
                    style={{
                      backgroundColor: colors.accent,
                      color: colors.accentForeground,
                    }}
                    className="hover:bg-opacity-90"
                  >
                    <Save className="mr-1 h-4 w-4" />
                    Save
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShareModalOpen(true)}
                    style={{
                      borderColor: colors.border,
                      color: colors.foreground,
                    }}
                  >
                    <Share2 className="mr-1 h-4 w-4" />
                    Share
                  </Button>
                  <Button
                    size="sm"
                    onClick={handleEdit}
                    style={{
                      backgroundColor: colors.accent,
                      color: colors.accentForeground,
                    }}
                    className="hover:bg-opacity-90"
                  >
                    <Edit className="mr-1 h-4 w-4" />
                    Edit
                  </Button>
                </>
              )}
            </div>
          </div>

          {isEditing ? (
            <Input
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              className="text-3xl font-bold mb-4 py-2 px-3"
              style={{
                backgroundColor: colors.background,
                color: colors.foreground,
                borderColor: colors.input,
              }}
            />
          ) : (
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-3xl sm:text-4xl font-bold mb-4"
              style={{ color: colors.foreground }}
            >
              {currentContent?.title}
            </motion.h1>
          )}

          <div className="flex items-center gap-3 mb-6">
            <Avatar className="h-8 w-8">
              <AvatarImage src={user?.imageUrl} />
              <AvatarFallback>
                {user?.firstName?.substring(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 text-sm">
              <span
                className="hidden sm:inline"
                style={{ color: colors.mutedForeground }}
              >
                •
              </span>
              <span
                className="flex items-center"
                style={{ color: colors.mutedForeground }}
              >
                <Clock className="mr-1 h-3 w-3" />
                {/* @ts-ignore */}
                Added on {formatDate(currentContent?.createdAt)}
              </span>
              <span
                className="hidden sm:inline"
                style={{ color: colors.mutedForeground }}
              >
                •
              </span>
            </div>
          </div>

          {isEditing ? (
            <textarea
              value={editedDescription}
              onChange={(e) => setEditedDescription(e.target.value)}
              className="w-full h-32 px-3 py-2 mb-6 rounded-md"
              style={{
                borderColor: colors.input,
                backgroundColor: colors.background,
                color: colors.foreground,
              }}
            />
          ) : (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="text-lg mb-6"
              style={{ color: colors.mutedForeground }}
            >
              {currentContent?.description}
            </motion.p>
          )}
        </motion.div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2"
          >
            <Card
              className="overflow-hidden border-2"
              style={{
                backgroundColor: colors.card,
                color: colors.cardForeground,
                borderColor: colors.border,
              }}
            >
              <div className="aspect-video">
                <iframe
                  src={getYoutubeEmbedUrl(currentContent?.link)}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              <div
                className="p-4 border-t"
                style={{ borderColor: colors.border }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="flex items-center gap-1"
                      style={{ color: colors.mutedForeground }}
                      onClick={() =>
                        document
                          .getElementById('comments')
                          ?.scrollIntoView({ behavior: 'smooth' })
                      }
                    ></Button>
                  </div>
                  <a
                    href={currentContent?.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-sm hover:underline"
                    style={{ color: colors.accent }}
                  >
                    Open original
                    <ExternalLink className="ml-1 h-3 w-3" />
                  </a>
                </div>
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-6"
          >
            <Card
              className="border-2"
              style={{
                backgroundColor: colors.card,
                color: colors.cardForeground,
                borderColor: colors.border,
              }}
            >
              <CardHeader className="pb-3">
                <CardTitle className="text-xl" style={{ color: colors.accent }}>
                  Content Summary
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p style={{ color: colors.mutedForeground }}>
                  {currentContent?.summary ||
                    'No summary available for this content.'}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>

      <ShareModal
        isOpen={shareModalOpen}
        onClose={() => setShareModalOpen(false)}
        contentId={currentContent?.id || ''}
      />
    </div>
  );
}
