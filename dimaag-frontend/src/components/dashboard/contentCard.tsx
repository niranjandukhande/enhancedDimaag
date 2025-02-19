import { Calendar, Hash, Play, User, Youtube } from "lucide-react";
import {motion} from "framer-motion";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Button } from "../ui/button";
import { YouTubeVideoModal } from "./youtubeVideoModel";
import { getYoutubeVideoId } from "@/utils/getyoutubeVideoId";
import { formatDate } from "@/utils/formatDate";

export const ContentCard = ({ data, showPrivate }:{data:any, showPrivate:boolean}) => {
    // Skip rendering if we're filtering private content and this is private
    if (!showPrivate && !data.isPublic) return null;
    
    const videoId = getYoutubeVideoId(data.link);
    
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        whileHover={{ 
          y: -5,
          boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)"
        }}
        className="w-full bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-sm border border-gray-100 dark:border-gray-800 hover:border-gray-200 dark:hover:border-gray-700 transition-all duration-300"
      >
        <div className="p-5">
          <div className="flex items-center gap-2 mb-4">
            <div className="h-8 w-8 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
              <Youtube className="h-4 w-4 text-red-600 dark:text-red-500" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">YouTube Content</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                {formatDate(data.createdAt)}
              </p>
            </div>
          </div>
          
          <div className="space-y-3">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white line-clamp-2">
              {data.title}
            </h2>
            
            <div className="h-1 w-16 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
            
            <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed line-clamp-3">
              {data.description}
            </p>
          </div>
          
          <div className="mt-5 flex flex-col gap-2">
            <a
              href={data.link}
              className="text-sm text-red-600 dark:text-red-400 hover:underline flex items-center gap-1 overflow-hidden text-ellipsis"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Youtube className="h-4 w-4 flex-shrink-0" />
              <span className="truncate">YouTube Video</span>
            </a>
            
            <div className="flex gap-3 text-xs text-gray-500 dark:text-gray-400">
              <div className="flex items-center gap-1">
                <User className="h-3 w-3" />
                {data.userId.substring(0, 6)}...
              </div>
              <div className="flex items-center gap-1">
                <Hash className="h-3 w-3" />
                {data.id.substring(0, 6)}...
              </div>
            </div>
          </div>
        </div>
        
        <div className="px-5 py-3 bg-gray-50 dark:bg-gray-800 flex items-center justify-between">
          <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center">
            {data.isPublic ? (
              <span className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400 text-xs px-2 py-0.5 rounded-full">Public</span>
            ) : (
              <span className="bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-400 text-xs px-2 py-0.5 rounded-full">Private</span>
            )}
          </div>
          
          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="ghost" 
                size="sm" 
                className="text-xs font-medium text-gray-700 dark:text-gray-300 flex items-center gap-1 hover:text-red-600 dark:hover:text-red-400 transition-colors"
              >
                <Play className="h-3 w-3" />
                Open Preview
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{data.title}</DialogTitle>
              </DialogHeader>
              <YouTubeVideoModal videoId={videoId!} title={data.title} />
              <p className="text-sm text-gray-500 mt-4">{data.description}</p>
            </DialogContent>
          </Dialog>
        </div>
      </motion.div>
    );
  };
  