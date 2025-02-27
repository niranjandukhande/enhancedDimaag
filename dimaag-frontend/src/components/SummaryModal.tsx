'use client';

import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { Calendar, Play, ThumbsUp, X } from 'lucide-react';
import { useState } from 'react';

interface YoutubeSummaryModalProps {
  title: string;
  url: string;
  date: string;
  keyPoints: string[];
  summary: string;
}

export default function YoutubeSummaryModal({
  props,
}: {
  props: YoutubeSummaryModalProps;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => {
          console.log('clicked');
          setIsOpen(true);
        }}
        className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl text-white px-4 py-2 rounded-md flex items-center"
      >
        <Play className="mr-2 h-4 w-4" /> Get Video Summary
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-lg shadow-lg max-w-lg w-full relative overflow-hidden"
          >
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-3 right-3 bg-gray-200 hover:bg-gray-300 rounded-full p-1"
            >
              <X className="h-5 w-5 text-gray-700" />
            </button>

            {/* Video */}
            <div
              className="relative w-full"
              style={{ paddingBottom: '56.25%' }}
            >
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src={`https://www.youtube.com/embed/${props.url}`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            {/* Content */}
            <div className="p-6">
              <Badge className="bg-red-600 hover:bg-red-700 mb-2">
                YouTube Summary
              </Badge>
              <h3 className="text-xl font-bold line-clamp-1">{props.title}</h3>

              {/* Meta Info */}
              <div className="flex flex-wrap gap-3 mb-4 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>{new Date(props.date).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-1">
                  <ThumbsUp className="h-4 w-4" />
                </div>
              </div>

              {/* Summary */}
              <div>
                <h4 className="text-lg font-semibold mb-2">Summary</h4>
                <p className="text-gray-700">{props.summary}</p>
              </div>

              {/* Key Points */}
              <div className="mt-4">
                <h4 className="text-lg font-semibold mb-2">Key Points</h4>
                <ul className="space-y-2">
                  {props.keyPoints.map((point, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.2, delay: 0.1 * index }}
                      className="flex items-start gap-2"
                    >
                      <div className="h-5 w-5 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-xs font-medium">{index + 1}</span>
                      </div>
                      <span className="text-sm">{point}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
}
