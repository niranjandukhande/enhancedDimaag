'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Youtube, FileText, Globe, ExternalLink, X } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from '@/components/ui/dialog';
import { contentType } from '@/types/content';

// Mock data based on the provided example
// const mockData = Array(12)
//   .fill(null)
//   .map((_, index) => ({
//     id: `item-${index}`,
//     title: index === 0 ? 'Dhruv Rathi Video' : `Content Item ${index + 1}`,
//     typeOfContent:
//       index % 3 === 0 ? 'youtube' : index % 3 === 1 ? 'article' : 'website',
//     description:
//       index === 0
//         ? 'This video is added for testing purpose of similarity search'
//         : `This is a sample description for content item ${index + 1}`,
//     link:
//       index % 3 === 0
//         ? 'https://www.youtube.com/watch?v=sZ3XogmwkaM'
//         : `https://example.com/item-${index + 1}`,
//     summary:
//       index === 0
//         ? "Nathuram Godse's assassination of Mahatma Gandhi in 1948 was the culmination of a year-long conspiracy involving several individuals, including Narayan Apte and Vinayak Damodar Savarkar. Godse, raised as a girl due to his family's belief in a curse, was radicalized by Savarkar and joined the RSS and Hindu Mahasabha."
//         : `This is a longer summary for content item ${index + 1}. It contains more details about the content and provides additional context for the reader.`,
//     isPublic: true,
//     createdAt: new Date(Date.now() - Math.random() * 10000000000).toISOString(),
//     updatedAt: new Date(Date.now() - Math.random() * 1000000000).toISOString(),
//     userId: 'user_2t4imqshnbvLRcDNL3yHOH6HliG',
//   }));

// Content type icons
const ContentTypeIcon = ({ type }: { type: string }) => {
  switch (type) {
    case 'youtube':
      return <Youtube className="h-4 w-4 text-red-500" />;
    case 'article':
      return <FileText className="h-4 w-4 text-blue-500" />;
    case 'website':
      return <Globe className="h-4 w-4 text-green-500" />;
    default:
      return <FileText className="h-4 w-4" />;
  }
};

// Format date
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(date);
};

// Extract YouTube video ID from URL
const getYouTubeVideoId = (url: string) => {
  if (!url) return null;

  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);

  return match && match[2].length === 11 ? match[2] : null;
};

// Modal state type
type SummaryModalType = {
  isOpen: boolean;
  title: string;
  link: string;
  summary: string;
};

export default function ExploreDisplay({
  content,
}: {
  content: contentType[];
}) {
  const mockData = content;
  // State for the summary modal
  const [summaryModal, setSummaryModal] = useState<SummaryModalType>({
    isOpen: false,
    title: '',
    link: '',
    summary: '',
  });

  // Handle opening the modal
  const handleOpenModal = (item: (typeof mockData)[0]) => {
    setSummaryModal({
      isOpen: true,
      title: item.title,
      link: item.link,
      summary: item.summary!,
    });
  };

  // Handle closing the modal
  const handleCloseModal = () => {
    setSummaryModal((prev) => ({ ...prev, isOpen: false }));
  };

  return (
    <div className="min-h-screen bg-[#2F3C7E] p-6 text-[#FBEAEB]">
      <div className="container mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Content Library</h1>
          <div className="flex justify-between items-center">
            <p className="text-[#FBEAEB]/80">
              Displaying {mockData.length} items in your collection
            </p>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockData.map((item) => (
            <GridCard
              key={item.id}
              item={item}
              onOpenPreview={() => handleOpenModal(item)}
            />
          ))}
        </div>
      </div>

      {/* Summary Modal */}
      <Dialog open={summaryModal.isOpen} onOpenChange={handleCloseModal}>
        <DialogContent className="sm:max-w-[90vw] md:max-w-[800px] lg:max-w-[900px] p-0 w-[95vw] max-h-[90vh] flex flex-col overflow-hidden rounded-lg border border-[#2F3C7E]/20 bg-white">
          <DialogHeader className="p-3 sm:p-4 md:p-6 flex flex-row items-center justify-between sticky top-0 z-10 border-b border-[#2F3C7E]/10 bg-[#FBEAEB]/30">
            <DialogTitle className="text-sm sm:text-base md:text-lg font-medium text-[#2F3C7E]">
              {summaryModal.title}
            </DialogTitle>
            {/* Only one X icon here */}
            <DialogClose className="bg-[#2F3C7E] text-white h-7 w-7 rounded-md opacity-80 hover:opacity-100 ring-offset-background transition-opacity duration-200 flex justify-center items-center">
              <X className="h-4 w-4" />
            </DialogClose>
          </DialogHeader>
          <div className="flex flex-col">
            {/* Video section */}
            <div className="relative w-full bg-[#2F3C7E]/5 pt-4">
              {summaryModal.link && getYouTubeVideoId(summaryModal.link) ? (
                <div className="flex justify-center items-center px-4 sm:px-6 pb-4">
                  <iframe
                    className="w-full aspect-video rounded-lg shadow-md"
                    src={`https://www.youtube.com/embed/${getYouTubeVideoId(summaryModal.link)}?autoplay=0`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              ) : (
                <div className="w-full aspect-video flex items-center justify-center bg-gray-100 rounded-lg mx-4 sm:mx-6 mb-4">
                  <p className="text-gray-500">Video unavailable</p>
                </div>
              )}
            </div>
            {/* Summary section with scrolling */}
            <div className="p-4 sm:p-6 overflow-y-auto max-h-[40vh]">
              {summaryModal.summary ? (
                <>
                  <h1 className="text-xl font-semibold text-[#2F3C7E] mb-3">
                    Summary
                  </h1>
                  <div className="text-sm sm:text-base text-gray-700 space-y-2">
                    {summaryModal.summary}
                  </div>
                </>
              ) : (
                <div className="flex items-center justify-center py-8">
                  <p className="text-gray-500 italic bg-[#FBEAEB]/50 py-3 px-6 rounded-lg">
                    No summary available
                  </p>
                </div>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// Grid Layout Card
function GridCard({ item, onOpenPreview }: any) {
  return (
    <motion.div
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className="h-full"
    >
      <Card className="overflow-hidden h-full bg-[#FBEAEB]/10 backdrop-blur-sm border-[#FBEAEB]/20 text-[#FBEAEB] hover:shadow-lg hover:shadow-[#FBEAEB]/10 transition-all duration-300">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <Badge variant="outline" className="flex items-center gap-1 mb-2">
              <ContentTypeIcon type={item.typeOfContent} />
              <span className="capitalize">{item.typeOfContent}</span>
            </Badge>
            <span className="text-xs text-[#FBEAEB]/60">
              {formatDate(item.createdAt)}
            </span>
          </div>
          <CardTitle className="text-xl line-clamp-2">{item.title}</CardTitle>
          <CardDescription className="text-[#FBEAEB]/70 line-clamp-2">
            {item.description}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-[#FBEAEB]/80 line-clamp-3">
            {item.summary}
          </p>
        </CardContent>
        <CardFooter className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="flex-1 border-[#FBEAEB]/30 hover:bg-[#FBEAEB] text-[#2F3C7E]"
            onClick={onOpenPreview}
          >
            <ExternalLink className="h-4 w-4 mr-2" />
            Open Preview
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
