import { useAxiosClient } from '@/config/axios';
import { useUserStore } from '@/stores/userStore';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import toast from 'react-hot-toast';

export const useUser = () => {
  const { setUsers, users } = useUserStore();

  const api = useAxiosClient();

  const { data, isLoading, isError } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const response = await api.get('/user/all');
      return response.data;
    },
    gcTime: 60 * 1000,
    staleTime: 60 * 1000,
    enabled: !users,
  });

  useEffect(() => {
    const toastId = isError ? toast.error('Error while loading content') : null;
    return () => toast.dismiss(toastId || '');
  }, [isError]);

  useEffect(() => {
    const toastId = isLoading ? toast.loading('Loading content...') : null;
    return () => toast.dismiss(toastId || '');
  }, [isLoading]);

  useEffect(() => {
    if (data) {
      setUsers(data.data);
    }
  }, [data]);
  return users;
};
