'use client';

import { motion } from 'framer-motion';
import { ChevronRight, Globe, Lock, Share2, Tag } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { ShareModal } from './share-modal';
import { TopNavigation } from './top-navigation';

import { useInfiniteContent } from '@/hooks/useInfinite';
import { contentType } from '@/types/content';

export default function Design2Dashboard() {
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [selectedContentId, setSelectedContentId] = useState<string>('');
  const [allContent, setAllContent] = useState<contentType[]>([]);

  // Create refs for infinite scrolling
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  const handleShare = (contentId: string) => {
    setSelectedContentId(contentId);
    setShareModalOpen(true);
  };

  const {
    content,

    status,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useInfiniteContent();

  // Set up the observer for infinite scrolling
  useEffect(() => {
    if (!loadMoreRef.current) return;

    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      // Increased threshold and rootMargin for smoother loading
      { threshold: 0.3, rootMargin: '200px' },
    );

    observerRef.current.observe(loadMoreRef.current);

    return () => {
      observerRef.current?.disconnect();
    };
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  // Flatten all content from pages for display
  useEffect(() => {
    if (content && content.length > 0) {
      const flattenedContent = content.flatMap((page) => page.data || []);
      setAllContent(flattenedContent);
    }
  }, [content]);

  if (status === 'pending' && !allContent.length) return <div>Loading</div>;

  // Based on the coral theme values
  return (
    <div className="min-h-screen bg-[hsl(30,50%,98%)] text-[hsl(20,14.3%,4.1%)]">
      <TopNavigation />

      <main className="container mx-auto px-4 py-8 pt-6">
        <div className="mb-8">
          <div className="flex items-center space-x-2 mb-4">
            <Tag className="h-5 w-5 text-[hsl(30,65%,60%)]" />
            <h2 className="text-xl font-semibold">Recent Content</h2>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {allContent.slice(0, 3).map((content, index) => (
              <motion.div
                key={content.id || `recent-${index}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full overflow-hidden border-2 border-[hsl(20,5.9%,90%)] hover:border-[hsl(30,65%,60%)] transition-all duration-300 bg-white">
                  <CardHeader className="bg-[hsl(30,60%,94%)]/30 pb-2">
                    <div className="flex justify-between items-center mb-2">
                      <Badge
                        variant="outline"
                        className="bg-[hsl(30,65%,60%)] text-[hsl(60,9.1%,97.8%)] border-[hsl(30,65%,60%)]"
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
                    <CardTitle className="line-clamp-1">
                      {content.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <p className="text-[hsl(25,5.3%,44.7%)] line-clamp-3 mb-4">
                      {content.description}
                    </p>
                    <div className="flex items-center justify-between mt-auto">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleShare(content.id || '')}
                        className="text-[hsl(25,5.3%,44.7%)]"
                      >
                        <Share2 className="h-4 w-4 mr-1" />
                        Share
                      </Button>
                      <Button
                        asChild
                        variant="outline"
                        size="sm"
                        className="rounded-full border-[hsl(20,5.9%,90%)]"
                      >
                        <Link to={`/dashboard/${content.id}`}>
                          View
                          <ChevronRight className="h-4 w-4 ml-1" />
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center space-x-2 mb-4">
            <Tag className="h-5 w-5 text-[hsl(30,65%,60%)]" />
            <h2 className="text-xl font-semibold">All Content</h2>
          </div>

          <motion.div
            className="space-y-4"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1,
                },
              },
            }}
          >
            {allContent.map((content, index) => (
              <motion.div
                key={content.id || `all-${index}`}
                variants={{
                  hidden: { opacity: 0, x: -20 },
                  visible: { opacity: 1, x: 0 },
                }}
              >
                <div className="bg-white rounded-xl overflow-hidden border border-[hsl(20,5.9%,90%)] hover:shadow-md transition-all">
                  <div className="flex flex-col sm:flex-row">
                    <div className="flex-1 p-4">
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
                      <p className="text-[hsl(25,5.3%,44.7%)] line-clamp-2 text-sm">
                        {content.description}
                      </p>
                    </div>
                    <div className="p-4 flex flex-row sm:flex-col items-center justify-end gap-2 bg-[hsl(30,60%,94%)]/30 sm:w-48">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleShare(content.id || '')}
                        className="text-[hsl(25,5.3%,44.7%)] w-full"
                      >
                        <Share2 className="h-4 w-4 mr-2" />
                        Share
                      </Button>
                      <Button
                        asChild
                        size="sm"
                        className="w-full bg-[hsl(30,65%,60%)] hover:bg-[hsl(30,65%,60%)]/90 text-[hsl(60,9.1%,97.8%)]"
                      >
                        <Link to={`/dashboard/${content.id}`}>
                          View Details
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Loading indicator and intersection observer target */}
          <div ref={loadMoreRef} className="py-8 mt-4 flex justify-center">
            {isFetchingNextPage ? (
              <div className="flex items-center space-x-2">
                <div className="animate-spin h-5 w-5 border-2 border-[hsl(30,65%,60%)] rounded-full border-t-transparent"></div>
                <span className="text-[hsl(25,5.3%,44.7%)]">
                  Loading more...
                </span>
              </div>
            ) : hasNextPage ? (
              <Button
                onClick={() => fetchNextPage()}
                variant="outline"
                className="border-[hsl(30,65%,60%)] text-[hsl(30,65%,60%)]"
              >
                Load More
              </Button>
            ) : allContent.length > 0 ? (
              <span className="text-[hsl(25,5.3%,44.7%)]">
                No more content to load
              </span>
            ) : null}
          </div>
        </div>
      </main>

      <ShareModal
        isOpen={shareModalOpen}
        onClose={() => setShareModalOpen(false)}
        contentId={selectedContentId}
      />
    </div>
  );
}
