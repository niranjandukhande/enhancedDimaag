import React, { useState } from 'react';
import { Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

// Define the content item type
interface ContentItem {
  id: string;
  isPublic: boolean;
  title: string;
  description: string;
  link: string;
  typeOfContent: string;
  createdAt: string;
  summary?: string;
}

interface ContentDisplayProps {
  contentData: ContentItem[];
}

const ContentDisplay: React.FC<ContentDisplayProps> = ({ contentData }) => {
  const [previewModal, setPreviewModal] = useState({
    isOpen: false,
    videoUrl: '',
    title: '',
  });

  // Handle preview click
  const handlePreviewClick = (link: string, title: string) => {
    setPreviewModal({
      isOpen: true,
      videoUrl: link,
      title: title,
    });
  };

  // Close the modal
  const handleCloseModal = () => {
    setPreviewModal({
      ...previewModal,
      isOpen: false,
    });
  };

  // Extract YouTube video ID
  const getYouTubeVideoId = (url: string) => {
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  return (
    <>
      {/* Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {contentData.map((item, index) => (
          <div
            key={item.id}
            className="animate-fade-in"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            {/* Content Card */}
            <div className="group relative bg-card-soft hover:bg-card-hover rounded-xl p-6 transition-all duration-500 ease-in-out transform hover:-translate-y-1 hover:shadow-xl shadow-lg">
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
                {item.summary && (
                  <p className="text-sm text-gray-500 italic line-clamp-2">
                    "{item.summary}"
                  </p>
                )}
                <Button
                  onClick={() => handlePreviewClick(item.link, item.title)}
                  className="w-full mt-4 bg-black hover:bg-gray-900 text-white group overflow-hidden relative transition-all duration-300"
                >
                  <span className="absolute inset-0 w-full h-full bg-white/10 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
                  <Play className="w-4 h-4 mr-2" />
                  Preview Video
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Video Preview Modal */}
      <Dialog open={previewModal.isOpen} onOpenChange={handleCloseModal}>
        <DialogContent className="sm:max-w-[900px] p-0">
          <DialogHeader className="p-6">
            <DialogTitle>{previewModal.title}</DialogTitle>
          </DialogHeader>
          <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
            {previewModal.videoUrl && (
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src={`https://www.youtube.com/embed/${getYouTubeVideoId(previewModal.videoUrl)}?autoplay=1`}
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
