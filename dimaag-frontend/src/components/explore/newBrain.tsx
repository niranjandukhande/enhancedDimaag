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

import { useParams } from 'react-router-dom';
import { userType } from '@/types/userType';
import { contentType } from '@/types/content';
import toast from 'react-hot-toast';
import { useAxiosClient } from '@/config/axios';
import { useQuery } from '@tanstack/react-query';
import { TopNavigation } from '../dashboard/utils/top-navigation';

export default function UserProfileAlt() {
  const username = useParams();

  const [user, setUser] = useState<userType | null>(null);
  const [content, setContent] = useState<contentType[]>([]);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

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

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen theme-coral bg-background">
        <div className="animate-pulse text-center">
          <div className="rounded-full h-12 w-12 bg-accent/50 mx-auto mb-4"></div>
          <p className="text-lg text-muted-foreground">
            Loading user profile...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <TopNavigation />

      <main className="container mx-auto px-4 py-8">
        <Button
          variant="ghost"
          onClick={() => router.back()}
          className="text-muted-foreground mb-6"
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
            <Card className="sticky top-24 border-2 overflow-hidden">
              <div className="h-32 bg-gradient-to-r from-accent to-secondary/70"></div>
              <CardContent className="pt-0 -mt-16">
                <div className="flex flex-col items-center">
                  <Avatar className="h-32 w-32 border-4 border-background">
                    <AvatarImage src={user.imageUrl} />
                    <AvatarFallback>
                      {user.username.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <h1 className="text-2xl font-bold mt-4">{user.username}</h1>
                  <p className="text-muted-foreground text-sm mb-4">
                    {user.email}
                  </p>
                </div>

                <div className="space-y-4 mt-4">
                  <p className="text-sm">{user.bio}</p>

                  <div className="pt-4 border-t border-border">
                    <ul className="space-y-3">
                      <li className="flex items-center text-sm">
                        <Mail className="mr-2 h-4 w-4 text-accent" />
                        {user.email}
                      </li>
                      <li className="flex items-center text-sm">
                        <Calendar className="mr-2 h-4 w-4 text-accent" />
                        Joined {formatDate(user.createdAt)}
                      </li>
                      <li className="flex items-center text-sm">
                        <Clock className="mr-2 h-4 w-4 text-accent" />
                        Last updated {formatDate(user.updatedAt)}
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="mt-6 flex gap-2">
                  <Button className="flex-1 bg-accent hover:bg-accent/90">
                    Follow
                  </Button>
                  <Button variant="outline" className="flex-1 border-accent/20">
                    Message
                  </Button>
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
                <Tag className="h-5 w-5 text-accent" />
                <h2 className="text-xl font-semibold">
                  {user.username}'s Content
                </h2>
              </div>

              <div className="flex rounded-md overflow-hidden border border-accent/20">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'outline'}
                  className={`rounded-none ${viewMode === 'grid' ? 'bg-accent' : 'bg-transparent'}`}
                  onClick={() => setViewMode('grid')}
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'outline'}
                  className={`rounded-none ${viewMode === 'list' ? 'bg-accent' : 'bg-transparent'}`}
                  onClick={() => setViewMode('list')}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {userContent.length > 0 ? (
              viewMode === 'grid' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {userContent.map((content, index) => (
                    <motion.div
                      key={content.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                    >
                      <Card className="h-full overflow-hidden border hover:border-accent/50 transition-all">
                        <div className="aspect-video bg-secondary/30 p-4 flex items-center justify-center">
                          <div className="w-full h-full bg-accent/10 rounded-md flex items-center justify-center">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="h-12 w-12 text-accent/40"
                            >
                              <polygon points="23 7 16 12 23 17 23 7" />
                              <rect
                                x="1"
                                y="5"
                                width="15"
                                height="14"
                                rx="2"
                                ry="2"
                              />
                            </svg>
                          </div>
                        </div>
                        <CardContent className="p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge
                              variant="outline"
                              className="bg-accent/10 text-accent border-accent/20"
                            >
                              {content.typeOfContent}
                            </Badge>
                            {content.isPublic ? (
                              <Badge
                                variant="secondary"
                                className="flex items-center gap-1"
                              >
                                <Globe className="h-3 w-3" /> Public
                              </Badge>
                            ) : (
                              <Badge
                                variant="outline"
                                className="flex items-center gap-1"
                              >
                                <Lock className="h-3 w-3" /> Private
                              </Badge>
                            )}
                          </div>
                          <h3 className="text-lg font-semibold mb-2">
                            {content.title}
                          </h3>
                          <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                            {content.description}
                          </p>
                          <Button
                            asChild
                            className="w-full bg-accent hover:bg-accent/90"
                          >
                            <a href={`/design2/${content.id}`}>View Content</a>
                          </Button>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {userContent.map((content, index) => (
                    <motion.div
                      key={content.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                    >
                      <Card className="overflow-hidden border hover:border-accent/50 transition-all">
                        <CardContent className="p-0">
                          <div className="flex flex-col md:flex-row">
                            <div className="md:w-1/3 bg-secondary/30 p-4 flex items-center justify-center">
                              <div className="aspect-video w-full bg-accent/10 rounded-md flex items-center justify-center">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  className="h-12 w-12 text-accent/40"
                                >
                                  <polygon points="23 7 16 12 23 17 23 7" />
                                  <rect
                                    x="1"
                                    y="5"
                                    width="15"
                                    height="14"
                                    rx="2"
                                    ry="2"
                                  />
                                </svg>
                              </div>
                            </div>
                            <div className="p-6 md:w-2/3">
                              <div className="flex items-center gap-2 mb-2">
                                <Badge
                                  variant="outline"
                                  className="bg-accent/10 text-accent border-accent/20"
                                >
                                  {content.typeOfContent}
                                </Badge>
                                {content.isPublic ? (
                                  <Badge
                                    variant="secondary"
                                    className="flex items-center gap-1"
                                  >
                                    <Globe className="h-3 w-3" /> Public
                                  </Badge>
                                ) : (
                                  <Badge
                                    variant="outline"
                                    className="flex items-center gap-1"
                                  >
                                    <Lock className="h-3 w-3" /> Private
                                  </Badge>
                                )}
                              </div>
                              <h3 className="text-xl font-semibold mb-2">
                                {content.title}
                              </h3>
                              <p className="text-muted-foreground mb-4">
                                {content.description}
                              </p>
                              <Button
                                asChild
                                className="bg-accent hover:bg-accent/90"
                              >
                                <a href={`/design2/${content.id}`}>
                                  View Content
                                </a>
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              )
            ) : (
              <Card className="border-2 border-dashed p-8 text-center">
                <CardContent>
                  <p className="text-muted-foreground">
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
