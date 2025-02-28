import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Switch } from '@/components/ui/switch';
import { useAxiosClient } from '@/config/axios';
import { useContent } from '@/hooks/useContent';
import { contentType } from '@/types/content';
import { useQueryClient } from '@tanstack/react-query';
import { Play, Trash2 } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useLocation } from 'react-router-dom';
import LinkModel from './LinkModel';

const ContentDisplay = ({ content }: { content: contentType[] }) => {
  const [pageNumber, setPageNumber] = useState(0);

  const location = useLocation();

  useContent(pageNumber);

  const [previewModal, setPreviewModal] = useState({
    isOpen: false,
    videoUrl: '',
    title: '',
  });

  const handlePreviewClick = (link: string, title: string) => {
    setPreviewModal({
      isOpen: true,
      videoUrl: link,
      title: title,
    });
  };

  const api = useAxiosClient();
  const queryClient = useQueryClient();

  async function handleDelete(id: string) {
    try {
      const res = await api.delete(`/content/${id}`);
      if (res.status === 200) {
        toast.success('Content deleted successfully');
      }
    } catch (error) {
      toast.error('Error deleting content');
    } finally {
      queryClient.invalidateQueries({
        queryKey: ['content'],
      });
    }
  }

  const handleCloseModal = () => {
    setPreviewModal({
      ...previewModal,
      isOpen: false,
    });

    setSummaryModal({
      ...summaryModal,
      isOpen: false,
    });
  };

  const [summaryModal, setSummaryModal] = useState({
    isOpen: false,
    summary: '',
    title: '',
    link: '',
  });

  const handleSummaryClick = (title: string, summary: string, link: string) => {
    setSummaryModal({
      isOpen: true,
      summary: summary,
      title: title,
      link: link,
    });
  };

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
    <div>
      <Button
        disabled={pageNumber === 0}
        onClick={() => setPageNumber(pageNumber - 1)}
      >
        Previous Page
      </Button>
      <Button onClick={() => setPageNumber(pageNumber + 1)}>Next Page</Button>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5 p-5">
        {!location.pathname.includes('/explore') && (
          <div className="flex justify-center items-center animate-fade-in group relative bg-card-soft hover:bg-card-hover rounded-xl p-8 mt-2 transition-all duration-500 ease-in-out transform hover:-translate-y-1 hover:shadow-xl shadow-lg border bg-white">
            <LinkModel />
          </div>
        )}
        {content &&
          content.map((item, index) => (
            <div
              key={item.id}
              style={{ animationDelay: `${index * 100}ms` }}
              className="animate-fade-in group relative bg-card-soft hover:bg-card-hover rounded-xl p-8 mt-2 transition-all duration-500 ease-in-out transform hover:-translate-y-1 hover:shadow-xl shadow-lg border bg-white"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium px-3 py-1 bg-black/5 rounded-full">
                    {item.typeOfContent}
                  </span>
                  <div className="absolute top-3 right-3 z-10 flex items-center gap-2 bg-white/80 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-sm">
                    <span className="text-xs font-medium text-gray-700">
                      {item.isPublic ? 'Public' : 'Private'}
                    </span>
                    <Switch checked={item.isPublic} />
                  </div>
                </div>

                <img
                  src={getYouTubeThumbnail(item.link)}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  alt={item.title || 'Content thumbnail'}
                />

                <h3 className="text-sm font-semibold leading-tight group-hover:text-gray-900 transition-colors duration-300">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-600 line-clamp-2">
                  {item.description}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-4">
                {!location.pathname.includes('/explore') ? (
                  <>
                    <Button
                      onClick={() => handlePreviewClick(item.link, item.title)}
                      className="w-full bg-black hover:bg-gray-900 text-white group overflow-hidden relative transition-all duration-300"
                    >
                      <span className="absolute inset-0 w-full h-full bg-white/10 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
                      <Play className="w-4 h-4 mr-2" />
                      Preview
                    </Button>
                    <Button
                      disabled={location.pathname.includes('/explore')}
                      onClick={() => handleDelete(item.id!)}
                      className="w-full bg-black hover:bg-gray-900 text-white group overflow-hidden relative transition-all duration-300"
                    >
                      <span className="absolute inset-0 w-full h-full bg-white/10 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete
                    </Button>
                  </>
                ) : (
                  <>
                    {/* <YoutubeSummaryModal
                          props={{
                            title: item.title,
                            url: item.link?.split('v=')[1] || item.link,
                            date: item.date || new Date().toISOString(),
                            keyPoints: item.keyPoints || [
                              'First key point about the video',
                              'Second important takeaway from the content',
                              'Final insight from the video',
                            ],
                            summary:
                              item.summary ||
                              'This is a placeholder summary for the video. Replace this with the actual summary content from your data source.',
                          }}
                        /> */}
                    <Button
                      onClick={() =>
                        handleSummaryClick(item.title, item.summary!, item.link)
                      }
                      className="w-full bg-black hover:bg-gray-900 text-white group overflow-hidden relative transition-all duration-300"
                    >
                      <span className="absolute inset-0 w-full h-full bg-white/10 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
                      <Play className="w-4 h-4 mr-2" />
                      Summary
                    </Button>
                  </>
                )}
              </div>
            </div>
          ))}
      </div>

      <Dialog open={previewModal.isOpen} onOpenChange={handleCloseModal}>
        <DialogContent className="sm:max-w-[900px] p-0">
          <DialogHeader className="p-6">
            <DialogTitle>{previewModal.title}</DialogTitle>
          </DialogHeader>
          <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
            {previewModal.videoUrl && (
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src={`https://www.youtube.com/embed/${getYouTubeVideoId(
                  previewModal.videoUrl,
                )}?autoplay=1`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            )}
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={summaryModal.isOpen} onOpenChange={handleCloseModal}>
        <DialogContent className="sm:max-w-[900px] p-0">
          <DialogHeader className="p-6">
            <DialogTitle>{summaryModal.title}</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col">
            {/* Video section */}
            <div
              className="relative w-full"
              style={{ paddingBottom: '56.25%' }}
            >
              {summaryModal.link && (
                <iframe
                  className="absolute top-0 left-0 w-full h-full"
                  src={`https://www.youtube.com/embed/${getYouTubeVideoId(
                    summaryModal.link,
                  )}?autoplay=0`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              )}
            </div>

            {/* Summary section */}
            <div className="p-6">
              {summaryModal.summary && <div>{summaryModal.summary}</div>}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ContentDisplay;
