'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { Play, Clock, Calendar, ThumbsUp, X } from 'lucide-react';

export default function YoutubeSummaryModal() {
  const [isLoading, setIsLoading] = useState(false);
  const [summary, setSummary] = useState<null | {
    title: string;
    channel: string;
    views: string;
    likes: string;
    date: string;
    thumbnail: string;
    summary: string;
    keyPoints: string[];
  }>(null);

  const fetchSummary = () => {
    setIsLoading(true);
    // Simulate API call to get YouTube video summary
    setTimeout(() => {
      setSummary({
        title: 'The Future of Web Development',
        channel: 'TechInsights',
        views: '1.2M',
        likes: '45K',
        date: 'May 15, 2023',
        thumbnail: '/placeholder.svg?height=720&width=1280',
        summary:
          'This video explores the evolving landscape of web development, focusing on new frameworks, tools, and methodologies that are shaping the future of how we build for the web. The speaker discusses the rise of AI-assisted development, the growing importance of performance optimization, and how edge computing is changing deployment strategies.',
        keyPoints: [
          'Next.js and React Server Components are revolutionizing rendering strategies',
          'AI tools are accelerating development workflows and code quality',
          'Edge computing enables faster, more reliable global deployments',
          "Web Assembly is expanding what's possible in browser environments",
          'Performance and accessibility are becoming primary concerns, not afterthoughts',
        ],
      });
      setIsLoading(false);
    }, 1500);
  };

  const resetSummary = () => {
    setSummary(null);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          onClick={fetchSummary}
          className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl"
          size="lg"
        >
          <Play className="mr-2 h-4 w-4" /> Get Video Summary
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] p-0 overflow-hidden rounded-xl border-0 shadow-2xl">
        <div className="absolute top-3 right-3 z-10">
          <Button
            variant="ghost"
            size="icon"
            onClick={resetSummary}
            className="rounded-full h-8 w-8 bg-black/20 backdrop-blur-sm text-white hover:bg-black/40 transition-all"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {isLoading ? (
          <div className="p-6 space-y-4">
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-4 w-1/4" />
            <Skeleton className="h-[200px] w-full rounded-lg" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          </div>
        ) : summary ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="relative">
              <div className="w-full aspect-video bg-gray-100">
                <img
                  src={summary.thumbnail || '/placeholder.svg'}
                  alt={summary.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              </div>
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <Badge className="bg-red-600 hover:bg-red-700 mb-2">
                  YouTube Summary
                </Badge>
                <h3 className="text-xl font-bold line-clamp-1">
                  {summary.title}
                </h3>
                <p className="text-sm opacity-90">{summary.channel}</p>
              </div>
            </div>

            <div className="p-6">
              <div className="flex flex-wrap gap-3 mb-4 text-sm">
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Clock className="h-3.5 w-3.5" />
                  <span>{summary.views} views</span>
                </div>
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Calendar className="h-3.5 w-3.5" />
                  <span>{summary.date}</span>
                </div>
                <div className="flex items-center gap-1 text-muted-foreground">
                  <ThumbsUp className="h-3.5 w-3.5" />
                  <span>{summary.likes} likes</span>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="text-lg font-semibold mb-2">Summary</h4>
                  <p className="text-muted-foreground">{summary.summary}</p>
                </div>

                <div>
                  <h4 className="text-lg font-semibold mb-2">Key Points</h4>
                  <ul className="space-y-2">
                    {summary.keyPoints.map((point, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.2, delay: 0.1 * index }}
                        className="flex items-start gap-2"
                      >
                        <div className="h-5 w-5 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-xs font-medium">
                            {index + 1}
                          </span>
                        </div>
                        <span className="text-sm">{point}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          <div className="p-6 text-center">
            <DialogHeader>
              <DialogTitle>YouTube Video Summary</DialogTitle>
              <DialogDescription>
                Click the button to load a summary of the video
              </DialogDescription>
            </DialogHeader>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
