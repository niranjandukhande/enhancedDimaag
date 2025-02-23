'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { useContentStore } from '@/stores/content';
import { useUserStore } from '@/stores/userStore';
import { contentType } from '@/types/content';
import { userType } from '@/types/userType';
import { useUser } from '@clerk/clerk-react';
import { AnimatePresence, motion } from 'framer-motion';
import { Search, Share2, Users } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

// Mock data
// const mockUsers = [
//   {
//     id: 1,
//     name: 'Alice Cooper',
//     email: 'alice@example.com',
//     avatar: '/placeholder.svg',
//   },
//   {
//     id: 2,
//     name: 'Bob Wilson',
//     email: 'bob@example.com',
//     avatar: '/placeholder.svg',
//   },
//   {
//     id: 3,
//     name: 'Carol Smith',
//     email: 'carol@example.com',
//     avatar: '/placeholder.svg',
//   },
//   {
//     id: 4,
//     name: 'David Brown',
//     email: 'david@example.com',
//     avatar: '/placeholder.svg',
//   },
//   {
//     id: 5,
//     name: 'Eve Johnson',
//     email: 'eve@example.com',
//     avatar: '/placeholder.svg',
//   },
// ];

const sharedWith = [
  {
    id: 1,
    name: 'Alice Cooper',
    email: 'alice@example.com',
    avatar: '/placeholder.svg',
  },
];

export default function ContentDetail() {
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const [allUsers, setAllUsers] = useState<userType[]>([]);
  const { users } = useUserStore();

  useUser();

  useEffect(() => {
    if (!users) return;
    setAllUsers(users);
  }, [users]);

  console.log('users at content page are : ', allUsers);

  const mockUsers = allUsers.map((user) => ({
    id: user.id, // Keeping the API's ID
    name: user.username, // Using username as the name
    email: user.email, // Generating an email
    avatar: user.imageUrl, // Keeping the same placeholder avatar
  }));

  const params = useParams<{ id: string }>();
  const { contents } = useContentStore();
  const [allContents, setAllContents] = useState<contentType[]>([]);

  useEffect(() => {
    if (contents) {
      setAllContents(contents);
      setIsLoading(false);
    }
  }, [contents]);

  const contentone = allContents.find((item) => item.id === params.id);

  const [content, setContent] = useState<contentType>(() => {
    return (
      contentone || {
        id: '',
        title: '',
        description: '',
        isPublic: false,
        link: '',
        summary: '',
        typeOfContent: '',
      }
    );
  });

  useEffect(() => {
    if (contentone) {
      setContent(contentone);
    }
  }, [contentone]);

  useEffect(() => {
    if (!contentone && !isLoading) {
      console.error('Content not found for ID:', params.id);
    }
  }, [contentone, isLoading, params.id]);

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

  const filteredUsers = mockUsers.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center w-full h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <SidebarProvider>
      <div className="flex h-screen bg-background">
        <Sidebar>
          <SidebarHeader>
            <h2 className="text-lg font-semibold px-4 py-2">Content Details</h2>
          </SidebarHeader>
          <SidebarContent className="p-4 space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Title</label>
                <Input
                  value={content?.title || ''}
                  onChange={(e) =>
                    setContent({ ...content, title: e.target.value })
                  }
                  className="transition-all duration-200 hover:border-primary focus:border-primary"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Description</label>
                <Textarea
                  value={content?.description || ''}
                  onChange={(e) =>
                    setContent({ ...content, description: e.target.value })
                  }
                  className="min-h-[150px] transition-all duration-200 hover:border-primary focus:border-primary"
                />
              </div>

              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">Visibility</label>
                <div className="flex items-center gap-2">
                  <Switch
                    checked={content?.isPublic || false}
                    onCheckedChange={(checked) =>
                      setContent({ ...content, isPublic: checked })
                    }
                  />
                  <span className="text-sm">Public</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium">Shared with</h3>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsShareModalOpen(true)}
                  className="flex items-center gap-2 transition-all duration-200 hover:bg-primary hover:text-primary-foreground"
                >
                  <Share2 className="h-4 w-4" />
                  Share
                </Button>
              </div>

              <div className="space-y-2">
                {sharedWith.map((user) => (
                  <motion.div
                    key={user.id}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 p-2 rounded-lg bg-muted/50 transition-all duration-200 hover:bg-muted"
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.avatar} />
                      <AvatarFallback>{user.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">
                        {user.name}
                      </p>
                      <p className="text-xs text-muted-foreground truncate">
                        {user.email}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </SidebarContent>
        </Sidebar>

        <SidebarInset className="flex flex-col">
          <header className="flex items-center h-14 px-4 border-b">
            <SidebarTrigger />
            <h1 className="ml-4 text-lg font-semibold">Content Viewer</h1>
          </header>
          <main className="flex-1 p-6 overflow-auto">
            <div className="grid grid-cols-2 gap-6 max-w-6xl mx-auto">
              <div className="space-y-4">
                <div className="aspect-video rounded-lg overflow-hidden bg-muted shadow-lg transition-all duration-300 hover:shadow-xl">
                  {content?.link ? (
                    <iframe
                      className="w-full h-full"
                      src={getYoutubeEmbedUrl(content.link)}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <p>No video link available</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Summary</h3>
                <div className="prose prose-sm max-w-none">
                  {content?.summary?.split('\n').map((line, index) => (
                    <p key={index} className="mb-2">
                      {line}
                    </p>
                  )) || <p>No summary available</p>}
                </div>
              </div>
            </div>
          </main>
        </SidebarInset>

        <Dialog open={isShareModalOpen} onOpenChange={setIsShareModalOpen}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Share Content
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-4">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search users..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8"
                />
              </div>

              <div className="space-y-4">
                {sharedWith.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Current Access</h4>
                    <AnimatePresence>
                      {sharedWith.map((user) => (
                        <motion.div
                          key={user.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="flex items-center justify-between p-2 rounded-lg bg-muted/50"
                        >
                          <div className="flex items-center gap-2">
                            <Avatar>
                              <AvatarImage src={user.avatar} />
                              <AvatarFallback>{user.name[0]}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="text-sm font-medium">{user.name}</p>
                              <p className="text-xs text-muted-foreground">
                                {user.email}
                              </p>
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-destructive hover:bg-destructive/10"
                          >
                            Remove
                          </Button>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                )}

                <div className="space-y-2">
                  <h4 className="text-sm font-medium">Add People</h4>
                  <ScrollArea className="h-[200px] rounded-md border p-2">
                    <AnimatePresence>
                      {filteredUsers.map((user) => (
                        <motion.div
                          key={user.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50 transition-colors duration-200"
                        >
                          <div className="flex items-center gap-2">
                            <Avatar>
                              <AvatarImage src={user.avatar} />
                              <AvatarFallback>{user.name[0]}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="text-sm font-medium">{user.name}</p>
                              <p className="text-xs text-muted-foreground">
                                {user.email}
                              </p>
                            </div>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            className="hover:bg-primary hover:text-primary-foreground"
                          >
                            Add
                          </Button>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </ScrollArea>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </SidebarProvider>
  );
}
