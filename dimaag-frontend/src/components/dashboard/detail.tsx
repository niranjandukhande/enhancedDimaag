'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Search, Share2, Users } from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarTrigger,
  SidebarProvider,
  SidebarInset,
} from '@/components/ui/sidebar';

// Mock data
const mockUsers = [
  {
    id: 1,
    name: 'Alice Cooper',
    email: 'alice@example.com',
    avatar: '/placeholder.svg',
  },
  {
    id: 2,
    name: 'Bob Wilson',
    email: 'bob@example.com',
    avatar: '/placeholder.svg',
  },
  {
    id: 3,
    name: 'Carol Smith',
    email: 'carol@example.com',
    avatar: '/placeholder.svg',
  },
  {
    id: 4,
    name: 'David Brown',
    email: 'david@example.com',
    avatar: '/placeholder.svg',
  },
  {
    id: 5,
    name: 'Eve Johnson',
    email: 'eve@example.com',
    avatar: '/placeholder.svg',
  },
];

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
  const [content, setContent] = useState({
    id: '1',
    title: 'Advanced React Patterns',
    typeOfContent: 'Tutorial',
    description:
      'Learn advanced React patterns and best practices with detailed examples and real-world use cases. This comprehensive guide covers everything from basic patterns to advanced implementations.',
    isPublic: false,
    link: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    summary:
      'This tutorial covers:\n- Higher Order Components\n- Render Props Pattern\n- Custom Hooks Pattern\n- Compound Components\n- State Reducer Pattern\n- Controlled vs Uncontrolled Components\n\nPerfect for intermediate to advanced React developers looking to level up their component architecture skills.',
  });

  const getYoutubeEmbedUrl = (url: string) => {
    const videoId = url.split('v=')[1];
    return `https://www.youtube.com/embed/${videoId}`;
  };

  const filteredUsers = mockUsers.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()),
  );

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
                  value={content.title}
                  onChange={(e) =>
                    setContent({ ...content, title: e.target.value })
                  }
                  className="transition-all duration-200 hover:border-primary focus:border-primary"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Description</label>
                <Textarea
                  value={content.description}
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
                    checked={content.isPublic}
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
              {/* Video Section */}
              <div className="space-y-4">
                <div className="aspect-video rounded-lg overflow-hidden bg-muted shadow-lg transition-all duration-300 hover:shadow-xl">
                  <iframe
                    className="w-full h-full"
                    src={getYoutubeEmbedUrl(content.link)}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>

              {/* Summary Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Summary</h3>
                <div className="prose prose-sm max-w-none">
                  {content.summary?.split('\n').map((line, index) => (
                    <p key={index} className="mb-2">
                      {line}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </main>
        </SidebarInset>

        {/* Share Modal */}
        <Dialog open={isShareModalOpen} onOpenChange={setIsShareModalOpen}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Share Content
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-4">
              {/* Search */}
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
                {/* Current Access */}
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

                {/* Available Users */}
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
