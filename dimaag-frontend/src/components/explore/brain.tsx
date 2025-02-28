import { useAxiosClient } from '@/config/axios';
import { contentType } from '@/types/content';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';
import ContentDisplay from '../dashboard/utils/contentDisplay';
import ExploreDisplay from '../dashboard/utils/exploreDisplay';

export default function Brain() {
  const [content, setContent] = useState<contentType[]>();

  const { username } = useParams();
  const api = useAxiosClient();

  const { data, isLoading, isError } = useQuery({
    queryKey: ['brain', username],
    queryFn: async () => {
      const res = await api.get(`/permission/${username}`);
      return res.data;
    },
    staleTime: 1000 * 60,
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

  useEffect(() => {
    if (data) {
      setContent(data.data);
    }
  }, [data, setContent]);

  console.log(content);

  // useEffect(() => {
  //   (async () => {
  //     const res = await api.get(`/permission/${username}`);
  //     console.log('res', res.data);
  //   })();
  // }, [username]);
  return (
    <>
      {/* {content && <ContentDisplay content={content} />} */}
      {content && <ExploreDisplay content={content} />}
    </>
  );
}
