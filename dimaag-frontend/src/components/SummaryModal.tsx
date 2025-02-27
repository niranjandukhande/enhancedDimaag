'use client';

import type React from 'react';

import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { Calendar, Play, ThumbsUp, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

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
  const modalRef = useRef<HTMLDivElement>(null);

  // Handle ESC key press to close modal
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscKey);
      // Prevent body scrolling when modal is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscKey);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  // Handle click outside to close
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      setIsOpen(false);
    }
  };

  return (
    <>
      <button
        onClick={() => {
          console.log('clicked');
          setIsOpen(true);
        }}
        className="w-full bg-black hover:bg-gray-900 text-white group overflow-hidden relative transition-all duration-300"
      >
        <span className="absolute inset-0 w-full h-full bg-white/10 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
        <Play className="w-4 h-4 mr-2 inline" /> Summary
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={handleOverlayClick}
        >
          <motion.div
            ref={modalRef}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-lg shadow-lg w-full max-w-lg relative overflow-hidden max-h-[90vh] flex flex-col"
          >
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-3 right-3 bg-gray-200 hover:bg-gray-300 rounded-full p-1.5 z-10 shadow-md transition-all duration-200 hover:scale-110"
              aria-label="Close modal"
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
                src={`https://www.youtube.com/embed/${props.url.includes('v=') ? props.url.split('v=')[1] : props.url}`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title={props.title}
              />
            </div>

            {/* Content */}
            <div className="p-6 overflow-y-auto">
              <Badge className="bg-red-600 hover:bg-red-700 mb-2">
                YouTube Summary
              </Badge>
              <h3 className="text-xl font-bold line-clamp-2 mb-2">
                {props.title}
              </h3>

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
