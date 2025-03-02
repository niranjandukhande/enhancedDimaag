'use client';

import { useEffect, useState } from 'react';

import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Mail,
  Calendar,
  Clock,
  Tag,
  Globe,
  Lock,
  Grid,
  List,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

import { useNavigate, useParams } from 'react-router-dom';
import { userType } from '@/types/userType';
import { contentType } from '@/types/content';
import toast from 'react-hot-toast';
import { useAxiosClient } from '@/config/axios';
import { useQuery } from '@tanstack/react-query';
import { TopNavigation } from '../dashboard/utils/top-navigation';
import { formatDate } from '@/utils/formatDate';
import { useUser } from '@/hooks/useUser';

export default function UserProfileAlt() {
  const [user, setUser] = useState<userType>();
  const [content, setContent] = useState<contentType[]>([]);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const navigate = useNavigate();

  const users = useUser();
  console.log(users);
  const username = useParams().username;
  console.log(username);

  const api = useAxiosClient();
  const { data, isLoading, isError } = useQuery({
    queryKey: ['brain', username],
    queryFn: async () => {
      const res = await api.get(`/permission/${username}`);
      return res.data;
    },
    staleTime: 1000 * 60,
    refetchOnMount: false,
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
    if (data) {
      setContent(data.data);
    }
  }, [data, setContent]);

  console.log(content);

  useEffect(() => {
    if (users) {
      if (users.length > 0) {
        const userOne = users?.find((user) => user.username === username);
        console.log();
        setUser(userOne);
      }
    }
  }, [users]);

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[hsl(30,50%,98%)] text-[hsl(20,14.3%,4.1%)]">
        <div className="animate-pulse text-center">
          <div className="rounded-full h-12 w-12 bg-[hsl(30,65%,60%)]/50 mx-auto mb-4"></div>
          <p className="text-lg text-[hsl(25,5.3%,44.7%)]">
            Loading user profile...
          </p>
        </div>
      </div>
    );
  }

  const getYouTubeVideoId = (url: string) => {
    if (!url) {
      return null;
    }

    try {
      const regExp =
        /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
      const match = url.match(regExp);

      if (match && match[2].length === 11) {
        return match[2];
      }
    } catch (error) {
      console.error('Error extracting YouTube video ID:', error);
    }

    return null;
  };

  const getYouTubeThumbnail = (url: string) => {
    const videoId = getYouTubeVideoId(url);
    if (!videoId) {
      return '/api/placeholder/400/225'; // Fallback placeholder image
    }

    return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
  };

  return (
    <div className="min-h-screen bg-[hsl(30,50%,98%)] text-[hsl(20,14.3%,4.1%)]">
      <TopNavigation />

      <main className="container mx-auto px-4 py-8">
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="text-[hsl(25,5.3%,44.7%)] mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Explore
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-4"
          >
            <Card className="sticky top-24 border-2 border-[hsl(20,5.9%,90%)] overflow-hidden bg-white">
              <div className="h-32 bg-gradient-to-r from-[hsl(30,65%,60%)] to-[hsl(30,60%,94%)]/70"></div>
              <CardContent className="pt-0 -mt-16">
                <div className="flex flex-col items-center">
                  <Avatar className="h-32 w-32 border-4 border-[hsl(30,50%,98%)]">
                    <AvatarImage src={user.imageUrl} />
                    <AvatarFallback>
                      {user.username.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <h1 className="text-2xl font-bold mt-4">{user.username}</h1>
                  <p className="text-[hsl(25,5.3%,44.7%)] text-sm mb-4">
                    {user.email}
                  </p>
                </div>

                <div className="space-y-4 mt-4">
                  <p className="text-sm">{user.bio}</p>

                  <div className="pt-4 border-t border-[hsl(20,5.9%,90%)]">
                    <ul className="space-y-3">
                      <li className="flex items-center text-sm">
                        <Mail className="mr-2 h-4 w-4 text-[hsl(30,65%,60%)]" />
                        {user.email}
                      </li>
                      <li className="flex items-center text-sm">
                        <Calendar className="mr-2 h-4 w-4 text-[hsl(30,65%,60%)]" />
                        Joined {formatDate(user.createdAt)}
                      </li>
                      <li className="flex items-center text-sm">
                        <Clock className="mr-2 h-4 w-4 text-[hsl(30,65%,60%)]" />
                        Last updated {formatDate(user.updatedAt)}
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-8"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-2">
                <Tag className="h-5 w-5 text-[hsl(30,65%,60%)]" />
                <h2 className="text-xl font-semibold">
                  {user.username}'s Content
                </h2>
              </div>

              <div className="flex rounded-md overflow-hidden border border-[hsl(30,65%,60%)]/20">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'outline'}
                  className={`rounded-none ${viewMode === 'grid' ? 'bg-[hsl(30,65%,60%)] text-[hsl(60,9.1%,97.8%)]' : 'bg-transparent text-[hsl(20,14.3%,4.1%)]'}`}
                  onClick={() => setViewMode('grid')}
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'outline'}
                  className={`rounded-none ${viewMode === 'list' ? 'bg-[hsl(30,65%,60%)] text-[hsl(60,9.1%,97.8%)]' : 'bg-transparent text-[hsl(20,14.3%,4.1%)]'}`}
                  onClick={() => setViewMode('list')}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {content.length > 0 ? (
              viewMode !== 'grid' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {content.map((content, index) => (
                    <motion.div
                      key={content.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                    >
                      <Card className="h-full overflow-hidden border border-[hsl(20,5.9%,90%)] hover:border-[hsl(30,65%,60%)]/50 transition-all bg-white">
                        <div className="aspect-video bg-[hsl(30,60%,94%)]/30 p-4 flex items-center justify-center">
                          <div className="w-full h-full bg-[hsl(30,65%,60%)]/10 rounded-md flex items-center justify-center">
                            <img
                              src={getYouTubeThumbnail(content.link)}
                              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                              alt={content.title || 'Content thumbnail'}
                            />
                          </div>
                        </div>
                        <CardContent className="p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge
                              variant="outline"
                              className="bg-[hsl(30,65%,60%)]/10 text-[hsl(30,65%,60%)] border-[hsl(30,65%,60%)]/20"
                            >
                              {content.typeOfContent}
                            </Badge>
                            {content.isPublic ? (
                              <Badge
                                variant="secondary"
                                className="flex items-center gap-1 bg-[hsl(30,60%,94%)] text-[hsl(24,9.8%,10%)]"
                              >
                                <Globe className="h-3 w-3" /> Public
                              </Badge>
                            ) : (
                              <Badge
                                variant="outline"
                                className="flex items-center gap-1 border-[hsl(20,5.9%,90%)]"
                              >
                                <Lock className="h-3 w-3" /> Private
                              </Badge>
                            )}
                          </div>
                          <h3 className="text-lg font-semibold mb-2">
                            {content.title}
                          </h3>
                          <p className="text-[hsl(25,5.3%,44.7%)] text-sm mb-4 line-clamp-2">
                            {content.description}
                          </p>
                          {/* <Button
                            asChild
                            className="w-full bg-[hsl(30,65%,60%)] hover:bg-[hsl(30,65%,60%)]/90 text-[hsl(60,9.1%,97.8%)]"
                          >
                            <a href={`/design2/${content.id}`}>View Content</a>
                          </Button> */}
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {content.map((content, index) => (
                    <motion.div
                      key={content.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                    >
                      <Card className="overflow-hidden border border-[hsl(20,5.9%,90%)] hover:border-[hsl(30,65%,60%)]/50 transition-all bg-white">
                        <CardContent className="p-0">
                          <div className="flex flex-col md:flex-row">
                            <div className="md:w-1/3 bg-[hsl(30,60%,94%)]/30 p-4 flex items-center justify-center">
                              <div className="aspect-video w-full bg-[hsl(30,65%,60%)]/10 rounded-md flex items-center justify-center">
                                <img
                                  src={getYouTubeThumbnail(content.link)}
                                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                  alt={content.title || 'Content thumbnail'}
                                />
                              </div>
                            </div>
                            <div className="p-6 md:w-2/3">
                              <div className="flex items-center gap-2 mb-2">
                                <Badge
                                  variant="outline"
                                  className="bg-[hsl(30,65%,60%)]/10 text-[hsl(30,65%,60%)] border-[hsl(30,65%,60%)]/20"
                                >
                                  {content.typeOfContent}
                                </Badge>
                                {content.isPublic ? (
                                  <Badge
                                    variant="secondary"
                                    className="flex items-center gap-1 bg-[hsl(30,60%,94%)] text-[hsl(24,9.8%,10%)]"
                                  >
                                    <Globe className="h-3 w-3" /> Public
                                  </Badge>
                                ) : (
                                  <Badge
                                    variant="outline"
                                    className="flex items-center gap-1 border-[hsl(20,5.9%,90%)]"
                                  >
                                    <Lock className="h-3 w-3" /> Private
                                  </Badge>
                                )}
                              </div>
                              <h3 className="text-xl font-semibold mb-2">
                                {content.title}
                              </h3>
                              <p className="text-[hsl(25,5.3%,44.7%)] mb-4">
                                {content.description}
                              </p>
                              {/* <Button
                                asChild
                                className="bg-[hsl(30,65%,60%)] hover:bg-[hsl(30,65%,60%)]/90 text-[hsl(60,9.1%,97.8%)]"
                              >
                                <a href={`/design2/${content.id}`}>
                                  View Content
                                </a>
                              </Button> */}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              )
            ) : (
              <Card className="border-2 border-dashed border-[hsl(20,5.9%,90%)] p-8 text-center bg-white">
                <CardContent>
                  <p className="text-[hsl(25,5.3%,44.7%)]">
                    This user hasn't shared any content yet.
                  </p>
                </CardContent>
              </Card>
            )}
          </motion.div>
        </div>
      </main>
    </div>
  );
}
