import { useAxiosClient } from '@/config/axios';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import toast from 'react-hot-toast';

export const useContent = () => {
  const api = useAxiosClient();

  const { data, isLoading, isError } = useQuery({
    queryKey: ['content'],
    queryFn: async () => {
      const response = await api.get('/content');
      return response.data;
    },
    gcTime: 24 * 60 * 60 * 1000,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  useEffect(() => {
    const toastId = isError ? toast.error('Error while loading content') : null;
    return () => toast.dismiss(toastId || '');
  }, [isError]);

  useEffect(() => {
    const toastId = isLoading ? toast.loading('Loading content...') : null;
    return () => toast.dismiss(toastId || '');
  }, [isLoading]);

  return { data, isLoading, isError };
};
