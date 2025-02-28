import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useAxiosClient } from '@/config/axios';
import { contentType } from '@/types/content';
import { useQueryClient } from '@tanstack/react-query';
import { Play, Plus, Trash2, X } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { useLocation, useNavigate } from 'react-router-dom';
import LinkModel from './LinkModel';

function ContentInfinite({
  content,
  error,
  status,
  fetchNextPage,
  isFetchingNextPage,
  hasNextPage,
}: {
  content: contentType[];
  error: any;
  status: any;
  fetchNextPage: any;
  isFetchingNextPage: any;
  hasNextPage: any;
}) {
  const location = useLocation();
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef(null);
  const navigate = useNavigate();

  const [previewModal, setPreviewModal] = useState({
    isOpen: false,
    videoUrl: '',
    title: '',
  });

  const [summaryModal, setSummaryModal] = useState({
    isOpen: false,
    summary: '',
    title: '',
    link: '',
  });

  const handlePreview = (videoUrl: string, title: string) => {
    if (!videoUrl) return;

    setPreviewModal({
      isOpen: true,
      videoUrl,
      title: title || 'Video Preview',
    });
  };

  const handleSummaryClick = (
    title: string,
    summary: string | undefined,
    link: string,
  ) => {
    if (!link) return;

    setSummaryModal({
      isOpen: true,
      summary: summary || 'No summary available',
      title: title || 'Content Summary',
      link,
    });
  };

  const handleCloseModal = () => {
    setPreviewModal({
      isOpen: false,
      videoUrl: '',
      title: '',
    });

    setSummaryModal({
      isOpen: false,
      summary: '',
      title: '',
      link: '',
    });
  };

  const api = useAxiosClient();
  const queryClient = useQueryClient();
  async function handleDelete(id: string | undefined) {
    try {
      const res = await api.delete(`/content/${id}`);
      if (res.status === 200) {
        toast.success('Content deleted successfully');
      }
    } catch (error) {
      toast.error('Error deleting content');
    } finally {
      queryClient.invalidateQueries({
        queryKey: ['infinite-content'],
      });
    }
  }

  // Set up intersection observer for infinite scrolling with improved threshold
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
  }, [fetchNextPage, hasNextPage, isFetchingNextPage, loadMoreRef]);

  const FirstCard = () => (
    <div className="flex justify-center items-center animate-fade-in group relative bg-[#FBEAEB] rounded-lg transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-md border border-gray-100 overflow-hidden h-full">
      <div className=" flex justify-center items-center relative h-32 sm:h-40 md:h-32 lg:h-36 overflow-hidden">
        {/* <div className="w-full h-full flex items-center justify-center bg-gray-50"> */}
        <Plus className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400" />
        <LinkModel />
        {/* </div> */}
      </div>
    </div>
  );

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

  // Responsive Compact Card Layout
  const CompactCard = ({
    item,
    index,
  }: {
    item: contentType;
    index: number;
  }) => (
    <div
      key={item.id}
      style={{ animationDelay: `${index * 50}ms` }}
      className="animate-fade-in group relative bg-[#FBEAEB] rounded-lg transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-md border border-gray-100 overflow-hidden h-full"
    >
      <div
        onClick={() => navigate(`/dashboard/${item.id}`)}
        className="relative h-32 sm:h-40 md:h-32 lg:h-36 overflow-hidden "
      >
        <img
          src={getYouTubeThumbnail(item.link)}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          alt={item.title || 'Content thumbnail'}
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      <div className="p-2 sm:p-3">
        <div className="flex justify-between items-center mb-1">
          <span className="text-xs font-medium px-2 py-0.5 bg-black/5 rounded-full truncate max-w-full">
            {item.typeOfContent || 'Content'}
          </span>
          <div className="flex items-center gap-1 bg-[#2F3C7E] backdrop-blur-sm px-2 py-0.5 rounded-full shadow-sm  border-white border">
            <span className="text-xs font-medium text-[#FBEAEB] ">
              {item.isPublic ? 'Public' : 'Private'}
            </span>
            {/* <Switch className="bg-[#2F3C7E]" checked={!!item.isPublic} /> */}
          </div>
        </div>

        <h3 className="text-xs sm:text-sm font-semibold leading-tight group-hover:text-gray-900 mb-1 line-clamp-1">
          {item.title || 'Untitled Content'}
        </h3>
        <p className="text-xs text-gray-600 line-clamp-1 mb-2">
          {item.description || 'No description available'}
        </p>

        <div className="flex justify-between gap-1 mt-1">
          {!location.pathname.includes('/explore') ? (
            <>
              <Button
                onClick={() =>
                  handleSummaryClick(item.title, item.summary, item.link)
                }
                size="sm"
                // variant="default"
                className="flex-1 h-6 sm:h-8 text-xs font-medium bg-[#2F3C7E] text-white hover:text-gray-900 hover:bg-gray-100"
              >
                <Play className="w-3 h-3 mr-1" />
                <span className="hidden xs:inline">Preview</span>
              </Button>
              <Button
                onClick={() => handleDelete(item.id)}
                size="sm"
                variant="destructive"
                className="flex-1 h-6 w-3xs sm:h-8 text-xs font-medium text-white hover:text-gray-900 hover:bg-gray-100"
              >
                <Trash2 className="w-3 h-3 mr-1" />
                <span className="hidden xs:inline">Delete</span>
              </Button>
            </>
          ) : (
            <Button
              onClick={() =>
                handleSummaryClick(item.title, item.summary, item.link)
              }
              size="sm"
              variant="ghost"
              className="flex-1 h-6 sm:h-8 text-xs font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100"
            >
              <Play className="w-3 h-3 mr-1" />
              <span className="hidden xs:inline">Summary</span>
            </Button>
          )}
        </div>
      </div>
    </div>
  );

  // Enhanced loading state with responsive skeletons
  if (status === 'pending')
    return (
      <div className="container mx-auto px-2 sm:px-4 py-4 sm:py-6">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <div
              key={index}
              className="animate-pulse bg-gray-100 rounded-lg h-40 sm:h-48"
            />
          ))}
        </div>
      </div>
    );

  if (status === 'error')
    return (
      <div className="mx-auto px-4 py-6 max-w-lg">
        <div className="text-red-500 p-4 border border-red-200 rounded-lg bg-red-50">
          <p className="font-medium">Error loading content</p>
          <p className="text-sm mt-1">
            {error?.message || 'Unknown error occurred'}
          </p>
          <Button
            onClick={() => fetchNextPage()}
            variant="outline"
            className="mt-3 bg-white text-sm"
          >
            Try again
          </Button>
        </div>
      </div>
    );

  const hasContent = content?.length > 0 && content[0]?.data?.length > 0;

  return (
    <div className="container mx-auto px-2 sm:px-4 py-4 sm:py-6">
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-4">
        {/* First card with input component */}
        <FirstCard />

        {content?.map((page, pageIndex) => (
          <React.Fragment key={`page-${pageIndex}`}>
            {(page.data || []).map((item, itemIndex) => {
              // Calculate the overall index for staggered animation
              const index = pageIndex * (page.data?.length || 0) + itemIndex;
              return (
                <CompactCard
                  key={`item-${item?.id || index}`}
                  item={item}
                  index={index}
                />
              );
            })}
          </React.Fragment>
        ))}
      </div>

      {/* No content state */}
      {!hasContent && status !== 'pending' && (
        <div className="py-12 text-center">
          <p className="text-gray-500">No content found</p>
          <p className="text-sm text-gray-400 mt-2">
            Start by adding new content using the "+" card
          </p>
        </div>
      )}

      {/* Enhanced loading indicator with better visibility */}
      <div
        ref={loadMoreRef}
        className="py-6 sm:py-8 flex justify-center items-center transition-opacity duration-300"
      >
        {isFetchingNextPage ? (
          <div className="flex items-center space-x-2 bg-white px-3 sm:px-4 py-1 sm:py-2 rounded-full shadow-md">
            <div className="animate-spin h-4 w-4 sm:h-5 sm:w-5 border-2 border-gray-300 rounded-full border-t-gray-800"></div>
            <span className="text-xs sm:text-sm text-gray-700 font-medium">
              Loading more...
            </span>
          </div>
        ) : hasNextPage && hasContent ? (
          <Button
            onClick={() => fetchNextPage()}
            variant="outline"
            className="bg-white shadow-sm hover:shadow transition-all duration-300 text-xs sm:text-sm py-1 h-8 sm:h-10"
          >
            Load more content
          </Button>
        ) : hasContent ? (
          <span className="text-xs sm:text-sm text-gray-500 bg-white px-3 sm:px-4 py-1 sm:py-2 rounded-full shadow-sm">
            You've reached the end
          </span>
        ) : null}
      </div>

      {/* Responsive Summary Modal */}
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
                    src={`https://www.youtube.com/embed/${getYouTubeVideoId(
                      summaryModal.link,
                    )}?autoplay=0`}
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

export default ContentInfinite;
