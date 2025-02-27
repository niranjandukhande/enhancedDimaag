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
import { useContentStore } from '@/stores/content';
import { contentType } from '@/types/content';
import { useQueryClient } from '@tanstack/react-query';
import { Play, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useLocation, useNavigate } from 'react-router-dom';

//////////////////////////////////////////////////////////////////////////////////
///                              TODO: CHANGE PAGINATION THINGY TO BE ADDED IN THE STORE
///
///      - pagination works as intented
///      - prev page button will get disabled if page number is already at 0
///      - get the total number of pages from backend, (to disable if next page is not available)
///      - SUBAH UTH KE ADD MAT KAR DE, APAN JAB HONGE TAB HI KARNA
///
//////////////////////////////////////////////////////////////////////////////////

const ContentDisplay = ({ content }: { content: contentType[] }) => {
  const [pageNumber, setPageNumber] = useState(0);

  const location = useLocation();
  console.log(location.pathname.includes('/explore'));

  const navigate = useNavigate();

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
  };

  const getYouTubeVideoId = (url: string) => {
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  return (
    <>
      <Button
        disabled={pageNumber === 0}
        onClick={() => setPageNumber(pageNumber - 1)}
      >
        Previous Page
      </Button>
      <Button onClick={() => setPageNumber(pageNumber + 1)}>Next Page</Button>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 ">
        {content &&
          content.map((item, index) => (
            <div
              onClick={() => {
                {
                  if (!location.pathname.includes('/explore')) {
                    navigate(`/dashboard/${item.id}`);
                  }
                }
              }}
              key={item.id}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="group relative bg-card-soft hover:bg-card-hover rounded-xl p-8 mt-10 transition-all duration-500 ease-in-out transform hover:-translate-y-1 hover:shadow-xl shadow-lg">
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
                  <h3 className="text-xl font-semibold leading-tight group-hover:text-gray-900 transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {item.description}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-4">
                    <Button
                      onClick={() => handlePreviewClick(item.link, item.title)}
                      className="w-full bg-black hover:bg-gray-900 text-white group overflow-hidden relative transition-all duration-300"
                    >
                      <span className="absolute inset-0 w-full h-full bg-white/10 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
                      <Play className="w-4 h-4 mr-2" />
                      Preview
                    </Button>

                    {!location.pathname.includes('/explore') ? (
                      <Button
                        disabled={location.pathname.includes('/explore')}
                        onClick={() => handleDelete(item.id!)}
                        className="w-full bg-black hover:bg-gray-900 text-white group overflow-hidden relative transition-all duration-300"
                      >
                        <span className="absolute inset-0 w-full h-full bg-white/10 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete
                      </Button>
                    ) : (
                      <Button className="w-full bg-black hover:bg-gray-900 text-white group overflow-hidden relative transition-all duration-300">
                        Summary
                      </Button>
                    )}
                  </div>
                </div>
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
    </>
  );
};

export default ContentDisplay;
