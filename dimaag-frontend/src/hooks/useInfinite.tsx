import { useAxiosClient } from '@/config/axios';
import { useContentStore } from '@/stores/contentStore';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import toast from 'react-hot-toast';

export const useInfiniteContent = () => {
  const api = useAxiosClient();
  const { setContents } = useContentStore();

  // Fetch function for infinite query
  const fetchItems = async ({ pageParam = 0 }) => {
    const response = await api.get('/content', {
      params: { page: pageParam },
    });
    return response.data;
  };

  // Set up infinite query
  const {
    data,
    error,
    status,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
    refetch,
  } = useInfiniteQuery({
    queryKey: ['infinite-content'],
    queryFn: fetchItems,
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextPage,
    gcTime: 24 * 60 * 60 * 1000,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });

  // Toast notifications
  useEffect(() => {
    const toastId = error ? toast.error('Error while loading content') : null;
    return () => toast.dismiss(toastId || '');
  }, [error]);

  useEffect(() => {
    const toastId =
      status === 'pending' ? toast.loading('Loading content...') : null;
    return () => toast.dismiss(toastId || '');
  }, [status]);

  // Flatten pages data for easier consumption if needed
  const flattenedContent = data?.pages.flatMap((page) => page.data) || [];

  useEffect(() => {
    if (data) {
      setContents(data.pages);
    }
  }, [data, setContents]);

  return {
    content: data?.pages || [],
    flattenedContent,
    error,
    status,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
    refetch,
  };
};
